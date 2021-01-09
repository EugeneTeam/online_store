'use strict';
const {Model} = require('sequelize');

module.exports = class RolePermission extends Model {
  static init(sequelize, DataType) {
    return super.init({
      permissionId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.STRING,
        onDelete: 'CASCADE'
      },
      roleId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.STRING,
        onDelete: 'CASCADE'
      },
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    // define association here
  }

}
