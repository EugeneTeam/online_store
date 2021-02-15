const {ApolloError} = require('apollo-server');
const models = require('../../models');
const {userError} = require('../../config/errorList');
const {checkFields} = require('../../utils/checkRequiredFields');
const {sendMail} = require('../../mailer/index');

module.exports = class User {
    static resolver() {
        return {
            Query: {
                authorization: async (obj, args) => {
                    checkFields(args, ['email', 'password']);
                    const user = await models.User.findOne({
                        where: {
                            email: args.email
                        }
                    });

                    if (!user) {
                        throw new ApolloError(userError.user_not_found.message, userError.user_not_found.code);
                    }
                    if (user.status === 'INACTIVE') {
                        throw new ApolloError(userError.account_is_inactive.message, userError.account_is_inactive.code)
                    }

                    return models.User.decryptPassword(args.password, userError.passwordHash)
                        .then(async response => {
                            if (response) {
                                return user.generateAccessToken(args.rememberMe || false)
                            } else {
                                throw new ApolloError(userError.invalid_credential.message, userError.invalid_credential.code);
                            }
                        })
                        .catch(error => {
                            throw new ApolloError(userError.invalid_credential.message, userError.invalid_credential.code);
                        })
                }
            },
            User: {
              role: user => user.getRole(),
            },
            Mutation: {
                sendRequestToChangePassword: async (obj, {email}) => {
                    const resetToken = models.User.generateLimitedTimeToken();
                    const user = await models.User.findOne({where: {email}});
                    if (!user) {
                        throw new ApolloError(userError.user_not_found.message, userError.user_not_found.code);
                    }

                    await user.update({resetToken});
                    await sendMail(
                        user.email,
                        'Смена пароля',
                        'Смена пароля',
                        'changePassword',
                        {
                            username: user.firstName,
                            url: `${process.env.URL_TO_CONFIRM_PASSWORD_CHANGE}${resetToken}`
                        });
                    return true;
                },
                confirmPasswordChange: async (obj, {newPassword, resetToken}) => {
                    models.User.checkTokenForExpirationDate(resetToken);

                    const user = await models.User.findOne({where: {resetToken}});
                    if (!user) {
                        throw new ApolloError(userError.user_not_found.message, userError.user_not_found.code);
                    }


                    await user.update({
                        passwordHash: await models.User.encryptPassword(newPassword),
                    });
                    return true;
                },
                resendAccountConfirmationEmail: async (obj, {email}) => {
                    const user = await models.User.findOne({where: {email}});
                    if (!user) {
                        throw new ApolloError(userError.user_not_found.message, userError.user_not_found.code);
                    }

                    const activationToken = models.User.generateLimitedTimeToken();
                    await user.update({activationToken})

                    await sendMail(
                        user.email,
                        'Завершение регистрации',
                        'Завершение регистрации',
                        'completeRegistration',
                        {
                            username: user.firstName,
                            url: `${process.env.URL_TO_VERIFY_YOU_ACCOUNT}${activationToken}`
                        });
                    return true;
                },
                confirmationUserAccount: async (obj, {activationToken}) => {
                    models.User.checkTokenForExpirationDate(activationToken)
                    const user = await models.User.findOne({where: {activationToken}});
                    if (!user) {
                        throw new ApolloError(userError.user_not_found.message, userError.user_not_found.code);
                    }

                    await user.update({
                        status: 'ACTIVE'
                    });
                    return true;
                },
                registration: async (obj, args) => {
                    checkFields(args, ['password', 'firstName', 'lastName', 'email', 'phone']);
                    const activationToken = models.User.generateLimitedTimeToken();
                    const newUser = await models.User.createItem({
                        item: {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            phone: args.phone,
                            email: args.email,
                            roleId: 1,
                            status: 'INACTIVE',
                            passwordHash: await models.User.encryptPassword(args.password),
                            authToken: await models.User.generateAuthToken(),
                            activationToken,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [
                            {options:{where: {email: args.email}}, message: 'Email is used', error: true},
                            {options:{where: {phone: args.phone}}, message: 'Phone is used', error: true}
                        ]
                    });

                    sendMail(
                        newUser.email,
                        'Завершение регистрации',
                        'Завершение регистрации',
                        'completeRegistration',
                        {
                            username: newUser.firstName,
                            url: `https://www.testurl.com/confirm/email/${activationToken}`
                        });
                    return newUser.encodeToken();
                }
            }
        }
    }

    static queryTypeDefs() {
        return `
            authorization(email: String!, password: String!, rememberMe: Boolean): String
        `;
    }

    static mutationTypeDefs() {
        return `
            sendRequestToChangePassword(email: String!): Boolean
            confirmPasswordChange(newPassword: String!, resetToken: String!): Boolean
            resendAccountConfirmationEmail(email: String!): Boolean
            confirmationUserAccount(activationToken: String!): Boolean
            registration(password: String!, email: String!, phone: String!, firstName: String!, lastName: String!): String
        `;
    }

    static typeDefs() {
        return `
            type User {
                firstName: String
                lastName: String
                phone: String
                email: String
                status: String
                authToken: String
                role: Role
                createdAt: String
                updatedAt: String
            }
        `;
    }
}
