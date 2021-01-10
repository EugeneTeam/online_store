const {ApolloServer, gql} = require('apollo-server-express')
const _ = require('lodash');
const User = require('./types/user')


const typeDefs = `
        ${
            User.typeDefs()
        }
        type Query {
            authorization(email: String!, password: String!): String
            test: String
        }
        type Mutation {
            registration(input: RegistrationInput): String
        }
`;

function combineTypeDefs() {
    return gql`${typeDefs}`;
}

function combineResolvers() {
    return (
        _.merge(
            User.resolver()
        )
    )
}
module.exports = new ApolloServer({
    typeDefs: combineTypeDefs(),
    resolvers: combineResolvers(),
    formatError: error => error,
    context: async ({req, res}) => {

    }
})
