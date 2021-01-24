/**
 *
 *[model name] [create/update/delete/show]
 *
 */

module.exports = {
    updateRole: {
        permissions: ['role update']
    },
    getRolesList: {
        permissions: ['role show']
    },
    getRoleById: {
        permissions: ['role show']
    },
    createRole: {
        permissions: ['role create']
    },
    removeRole: {
        permissions: ['role delete']
    },
}
