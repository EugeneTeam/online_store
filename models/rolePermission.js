'use strict';
const {CRUDOptimisation} = require('./../utils/CRUDOptimization');

module.exports = class RolePermission extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      permissionId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.STRING,
        references: {
          model: 'Permissions'
        },
        onDelete: 'CASCADE'
      },
      roleId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.STRING,
        references: {
          model: 'Roles'
        },
        onDelete: 'CASCADE'
      },
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsTo(models.Role, {
      foreignKey: 'roleId'
    });
    this.belongsTo(models.Permission, {
      foreignKey: 'permissionId'
    });
  }
}
