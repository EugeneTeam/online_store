'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RolePermissions', [
        { roleId: 1, permissionId: 1 },
        { roleId: 1, permissionId: 2 },
        { roleId: 1, permissionId: 3 },
        { roleId: 1, permissionId: 4 },
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RolePermissions', {roleId: 1}, {});
  }
};
