const {ApolloError} = require('apollo-server');
const models = require('../../models');
const {auth_error, invalid_credential} = require('../../config/errorList');
const {checkFields} = require('../../utils/checkRequiredFields');

module.exports = class User {
    static resolver() {
        return {
            Query: {
                authorization: async (obj, args) => {
                    checkFields(args, ['email', 'password']);
                    const isUserExists = await models.User.findOne({
                        where: {
                            email: args.email
                        }
                    });

                    if (!isUserExists) {
                        throw new ApolloError(auth_error.message, auth_error.code);
                    }

                    return models.User.decryptPassword(args.password, isUserExists.passwordHash)
                        .then(async response => {
                            if (response) {
                                return isUserExists.generateAccessToken(args.rememberMe || false)
                            } else {
                                throw new ApolloError(invalid_credential.message, invalid_credential.code);
                            }
                        })
                        .catch(error => {
                            throw new ApolloError(invalid_credential.message, invalid_credential.code);
                        })
                }
            },
            Mutation: {
                registration: async (obj, args) => {
                    checkFields(args, ['password', 'firstName', 'lastName', 'email', 'phone']);
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
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [
                            {options:{where: {email: args.email}}, message: 'Email is used', error: true},
                            {options:{where: {phone: args.phone}}, message: 'Phone is used', error: true}
                        ]
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
                roleId: Int
                createdAt: String
                updatedAt: String
            }
        `;
    }
}
