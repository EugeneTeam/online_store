const {ApolloServer} = require('apollo-server-express')
const _ = require('lodash');
const {checkPermission, checkAuthorization, getMethodName} = require('../permission/checkPermission');

const {resolvers, typeDefs} = require('./types')

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
    'getReplyComments',
    'getDeliveryTypeList',
    'getPaymentTypeList',
    'updateOrderPart',
    'removeOrderPart',
    'getCategoryById'
];

module.exports = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: error => error,
    context: async ({req}) => {
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



