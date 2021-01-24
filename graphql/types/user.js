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
                                return isUserExists.generateAccessToken()
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
                registration: async (obj, {input}) => {
                    checkFields(input, ['password', 'firstName', 'lastName', 'email', 'phone']);

                    const newUser = await models.User.createItem({
                        firstName: input.firstName,
                        lastName: input.lastName,
                        phone: input.phone,
                        email: input.email,
                        roleId: 'customer',
                        status: 'INACTIVE',
                        passwordHash: await models.User.encryptPassword(input.password),
                        authToken: await models.User.generateAuthToken(),
                    }, [
                        {identifier:{where: {email: input.email}}, message: 'Email is used', failureIfExists: true},
                        {identifier:{where: {phone: input.phone}}, message: 'Phone is used', failureIfExists: true}
                    ]);
                    return newUser.encodeToken();
                }

            }
        }
    }

    static queryTypeDefs() {
        return `
            authorization(email: String!, password: String!): String
        `;
    }

    static mutationTypeDefs() {
        return `
            registration(input: RegistrationInput): String
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
            
            input RegistrationInput {
                password: String!
                email: String!
                phone: String!
                firstName: String!
                lastName: String!
            }
        `;
    }
}
