const {ApolloServer} = require('apollo-server-express')
const _ = require('lodash');
const {checkPermission, checkAuthorization, getMethodName} = require('../permission/checkPermission');

const {resolvers, typeDefs} = require('./types')

// list of public methods
const excludeMethods = [
    'authorization',
    'registration',
    'resendAccountConfirmationEmail',
    'confirmationUserAccount',
    'getProductListByFilter',
    'sendRequestToChangePassword',
    'confirmPasswordChange',
    'getProductById',
    'getProductList',
    'getProductListByFilter',
    'getReplyComments'
];

module.exports = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: error => error,
    context: async ({req, res}) => {
        const method = getMethodName(req.body.query);
        let context = {
            user: null
        }
        if (method && !excludeMethods.includes(method)) {
            context.user = await checkAuthorization(req);
            checkPermission(req.body.query, context.user);
        }
        return context;
    }
})



