'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {string} = require('../validation/duplicateValidations');

module.exports = class Role extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataType.STRING,
        validate: string
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
    this.hasOne(models.User, {
      foreignKey: 'roleId'
    });
  }
}
