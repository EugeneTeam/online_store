const models = require('../../models');
const {DEFAULT_OFFSET, DEFAULT_LIMIT} = require('../../config/constants').PAGINATION

module.exports = class Role {
    static resolver() {
        return {
            Query: {
                getRolesList: async (obj, args) => {
                    return models.Role.findItem({
                        options: {
                            limit: args.limit || DEFAULT_LIMIT,
                            offset: args.offset || DEFAULT_OFFSET
                        },
                        count: true
                    })
                },
                getRoleById: async (obj, args) => {
                    return  models.Role.findItem({options: args.roleId, error: true});
                }
            },
            Role: {
                permissions: (role) => role.getPermissions()
            },
            Mutation: {
                createRole: async (obj, args) => {
                    return models.Role.createItem({
                        item: {name: args.name},
                        dependency: [{
                            options: {where: {name: args.name}},
                            error: true,
                            message: `Role ${args.name} is exists`
                        }]
                    })
                },
                removeRole: async (obj, args, context) => {
                    return models.Role.removeItem({
                        options: args.roleId
                    });
                },
                updateRole: async (obj, args) => {
                    return models.Role.updateItem({
                        options: args.roleId,
                        updatedItem: {name: args.name},
                        dependency: [{
                            options: {where: {name: args.name}},
                            error: true,
                            message: `Role ${args.name} is used`
                        }]

                    })
                }
            }
        }
    }

    static typeDefs() {
        return `
            type Role {
                id: Int
                name: String
                permissions: [Permission]
            }
            
            type RoleList {
                rows: [Role]
                count: Int
            }
        `;
    }

    static mutationTypeDefs() {
        return `
            createRole(name: String!): Role
            removeRole(roleId: Int!): String
            updateRole(roleId: Int!, name: String!): Role
        `
    }

    static queryTypeDefs() {
        return `
            getRolesList(limit: Int, offset: Int): RoleList
            getRoleById(roleId: Int!): Role
        `
    }
}
