const list = require('./constants');
const models = require('../models');
const {ApolloError} = require('apollo-server');
const {permissionErrors, tokenErrors, userErrors} = require('../config/errorList');

const checkPermission = (query, user) => {
    const permissions = user.Role.Permissions.map(permission => permission.name);
    if (typeof query === 'string') {
        const methodName = getMethodName(query);
        if (methodName !== null && list[methodName] !== undefined) {
            if (list[methodName].permissions.length) {
                let denied = false;
                for (const permission of list[methodName].permissions) {
                    if (permissions.includes(permission)) {
                        denied = true
                        break;
                    }
                }

                if (!denied) {
                    throw new ApolloError(permissionErrors.access_denied.message, permissionErrors.access_denied.code);
                }
            }
        }
    }
}

const getMethodName = query => {
    /**
     * case 1
     * query {
     *     someMethod {
     *         filed1
     *         field2
     *     }
     * }
     */
    /**
     * case 2
     * query {
     *     someMethod(variable: 100) {
     *         field1
     *         field2
     *     }
     * }
     */
    /**
     * case 3
     * query someMethod {
     *     someMethod {
     *         field1
     *         field2
     *     }
     * }
     */
    /**
     * case 4
     * query someMethod($variable: Int) {
     *     someMethod(variable: $variable) {
     *         field1
     *         field2
     *     }
     * }
     */
    /**
     * case 5
     * {someMethod}
     */
    let temp = query.replace(/[\n]/g, '').replace(/[ ]/g, '');
    const isCase1 = temp[0] === '{';
    const end = temp.substring(1, temp.length).search(/[{}()]/g);
    const result = temp.substring(isCase1 ? 1 : 'query'.length, end + 1);
    if (result === 'IntrospectionQuery') {
        return null;
    }
    return result;
}

const checkAuthorization = async req => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ');
        if (token[0] === 'Bearer' && token[1]) {
            const result = await models.User.decodeToken(token[1])
            if (result && result.message === 'Token expired') {
                throw new ApolloError(tokenErrors.token_expired.message, tokenErrors.token_expired.code);
            }
            const user = await models.User.findOne({
                where: {
                    authToken: result
                },
                include: {
                    model: models.Role,
                    include: {
                        model: models.Permission
                    }
                }
            });

            if (!user) {
                throw new ApolloError(userErrors.not_authorized.message, userErrors.not_authorized.code);
            }
            if (user.status === 'INACTIVE') {
                throw new ApolloError(userErrors.account_is_inactive.message, userErrors.account_is_inactive.code)
            }

            return user;
        }
    }
    throw new ApolloError(userErrors.not_authorized.message, userErrors.not_authorized.code);
}

module.exports = {
    checkPermission,
    checkAuthorization,
    getMethodName
}
