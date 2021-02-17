const models = require('../../models');

module.exports = class RolePermission {
    static resolver() {
        return {
            Mutation: {
                addPermissionForRole: async (obj, args) => {
                    await models.RolePermission.createItem({
                        item: {
                            permissionId: args.permissionId,
                            roleId: args.roleId,
                        },
                        dependency: [
                            {
                                options: args.roleId,
                                tableName: 'Role',
                                errorIfElementDoesNotExist: true
                            },
                            {
                                options: args.permissionId,
                                tableName: 'Permission',
                                errorIfElementDoesNotExist: true
                            },
                            {
                                options: {
                                    where: {
                                        permissionId: args.permissionId,
                                        roleId: args.roleId,
                                    }
                                },
                                errorIfElementExists: true,
                                customErrorMessage: 'Permission added to this role'
                            }
                        ]
                    });
                    return models.Role.smartSearch({
                        options: args.roleId
                    });
                },
                addPermissionsForRole: async (obj, args) => {
                    if (args.permissionIds.length) {
                        await models.sequelize.transaction(async transaction => {
                            for (const id of args.permissionIds) {
                                await models.RolePermission.createItem({
                                    item: {
                                        permissionId: id,
                                        roleId: args.roleId,
                                    },
                                    transaction,
                                    dependency: [
                                        {
                                            options: args.roleId,
                                            tableName: 'Role',
                                            errorIfElementDoesNotExist: true
                                        },
                                        {
                                            options: args.permissionId,
                                            tableName: 'Permission',
                                            errorIfElementDoesNotExist: true
                                        },
                                        {
                                            options: {
                                                where: {
                                                    permissionId: id,
                                                    roleId: args.roleId,
                                                }
                                            },
                                            errorIfElementExists: true,
                                            customErrorMessage: `Permission (Id:${id}) added to this role`
                                        }
                                    ]
                                });
                            }
                        })
                    }
                    return models.Role.smartSearch({
                        options: args.roleId
                    });
                }
            }
        };
    }
    static mutationTypeDefs() {
        return `
            addPermissionForRole(roleId: Int!, permissionId: Int!): Role
            addPermissionsForRole(roleId: Int!, permissionIds: [Int]!): Role
        `;
    }
}
