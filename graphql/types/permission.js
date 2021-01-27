const models = require('../../models');
const {PAGINATION} = require('../../config/constants')

module.exports = class Permission {
    static resolver() {
        return {
            Query: {
                getPermissionById: async (obj, args) => {
                    return models.Permission.findItem({options: args.permissionId, error: true})
                },
                getPermissionList: async (obj, args) => {
                    return models.Permission.findItem({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET
                        },
                        count: true
                    })
                }
            },
            Mutation: {
                createPermission: async (obj, args) => {
                    return models.Permission.createItem({
                        item: {
                            name: args.name
                        },
                        dependency: [{
                            options: {
                                where: {
                                    name: args.name,
                                }
                            },
                            error: true,
                            message: `"${args.name}" is used`
                        }]
                    })
                },
                updatePermission: async (obj, args) => {
                    return models.Permission.updateItem({
                        options: args.permissionId,
                        updatedItem: {
                            name: args.name
                        },
                        dependency: [{
                            options: {
                                where: {
                                    name: args.name,
                                }
                            },
                            error: true,
                            message: `"${args.name}" is used`
                        }]
                    })
                },
                removePermission: async (obj, args) => {
                    return models.Permission.removeItem({
                        options: args.permissionId
                    })
                }
            }
        }
    }
    static typeDefs() {
        return `
            type Permission {
                id: Int
                name: String
            }
            type PermissionList {
                count: Int
                rows: [Permission]
            }
        `;
    }
    static queryTypeDefs() {
        return `
            getPermissionById(permissionId: Int!): Permission
            getPermissionList(limit: Int, offset: Int): PermissionList
        `;
    }
    static mutationTypeDefs() {
        return `
            createPermission(name: String!): Permission
            updatePermission(permissionId: Int!, name: String!): Permission
            removePermission(permissionId: Int!): String
        `;
    }
}
