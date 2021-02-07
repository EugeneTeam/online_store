const list = require('./constants');
const models = require('../models');
const {ApolloError} = require('apollo-server');

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
                    throw new ApolloError('access denied', '403');
                }
            }
        }
    }
}

const getMethodName = query => {

    let temp = query.replace(/[\n]/g, '').replace(/[ ]/g, '');
    let start = temp.indexOf('{');
    let end = temp.indexOf('(');
    /**
     * IntrospectionQuery - это стандартный запрос gql который происходит
     * автоматически через определенный промежуток времени
     * В сочетание с типом запроса query получается строка queryIntrospectionQuery
     */
    if (temp.split('{')[0] === 'queryIntrospectionQuery') {
        return null;
    }
    return temp.substring(start + 1, end);
}

const checkAuthorization = async req => {
    if (req.headers &&  req.headers.token) {
        const token = req.headers.token.split(' ');
        if (token[0] === 'Bearer' && token[1]) {
            const result = await models.User.decodeToken(token[1])
            if (result && result.message === 'Token expired') {
                throw new ApolloError('Token expired', '401');
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
                throw new ApolloError('not authorized','401');
            }

            return user;
        }
    }
    throw new ApolloError('not authorized','401');
}

module.exports = {
    checkPermission,
    checkAuthorization,
    getMethodName
}
