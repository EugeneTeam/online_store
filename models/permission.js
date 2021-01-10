'use strict';
const {Model} = require('sequelize');

module.exports = class Permission extends Model {
  static init(sequelize, DataType) {
    return super.init({
      nameId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.STRING,
        unique: true
      },
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: 'permissionId'
    });
    this.hasMany(models.RolePermission, {
      foreignKey: 'permissionId'
    });
  }
}
