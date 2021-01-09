const {ApolloError} = require('apollo-server');
const models = require('../../models');
const {GqlOptimizer} = require('../../utils/gqlOptimizer');
const {auth_error, invalid_credential} = require('../../config/errorList');

module.exports = class User {

    static resolver() {
        const gqlOptimizer = new GqlOptimizer('User', models);
        return {
            Query: {
                authorization: async (obj, args) => {
                    const {password, email} = gqlOptimizer.checkRequiredFields(args, [
                        'password', 'email'
                    ]);

                    const isUserExists = await models.User.findOne({
                        where: {
                            email
                        }
                    });

                    if (!isUserExists) {
                        throw new ApolloError(auth_error.message, auth_error.code);
                    }

                    return models.User.decryptPassword(password, isUserExists.passwordHash)
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
                    const {password, firstName, lastName, email, phone} = gqlOptimizer.checkRequiredFields(input, [
                        'password', 'firstName', 'lastName', 'email', 'phone'
                    ]);
                    const newUser = await gqlOptimizer.createItem({
                        firstName,
                        lastName,
                        phone,
                        email,
                        roleId: 'customer',
                        status: 'INACTIVE',
                        passwordHash: await models.User.encryptPassword(password),
                        authToken: await models.User.generateAuthToken(),
                    }, [
                        {where: {email: input.email}, errorMessage: 'Email is used', failureIfExists: true},
                        {where: {phone: input.phone}, errorMessage: 'Phone is used', failureIfExists: true}
                    ]);
                    return newUser.encodeToken();
                }

            }
        }
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
        `
    }
}
