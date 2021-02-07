const {ApolloServer, gql} = require('apollo-server-express')
const _ = require('lodash');
const {checkPermission, checkAuthorization, getMethodName} = require('../permission/checkPermission');

const {resolvers, typeDefs} = require('./types')

module.exports = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: error => error,
    context: async ({req, res}) => {
        const method = getMethodName(req.body.query);
        let context = {
            user: null
        }
        if (method !== 'authorization') {
            context.user = await checkAuthorization(req);
            checkPermission(req.body.query, context.user);
        }
        return context;
    }
})



