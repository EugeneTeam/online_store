'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const records = [];
      // admin
      for (let i = 1; i <= 49; i++) {
          records.push({ permissionId: i, roleId: 1})
      }
      // product manager
      for (let i = 1; i <= 16; i++) {
          records.push({ permissionId: i, roleId: 3})
      }
      // media manager
      for (let i = 25; i <= 31; i++) {
          records.push({ permissionId: i, roleId: 4})
      }
      //feature product manager
      records.push({ permissionId: 4, roleId: 5})
      records.push({ permissionId: 12, roleId: 5})
      records.push({ permissionId: 16, roleId: 5})
      for (let i = 17; i <= 24; i++) {
          records.push({ permissionId: i, roleId: 5})
      }
      await queryInterface.bulkInsert('RolePermissions', records, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RolePermissions', {roleId: [1, 3, 4, 5]}, {});
  }
};
