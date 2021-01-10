'use strict';
const {Model} = require('sequelize');

module.exports = class Role extends Model {
  static init(sequelize, DataType) {
    return super.init({
      nameId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.STRING,
        unique: true
      }
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsToMany(models.Permission, {
      through: models.RolePermission,
      foreignKey: 'roleId'
    });
    this.hasMany(models.RolePermission, {
      foreignKey: 'roleId'
    });
    this.hasMany(models.User, {
      foreignKey: 'roleId'
    });
  }
}
