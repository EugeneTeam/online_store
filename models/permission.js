'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {string} = require('../validation/duplicateValidations');

module.exports = class Permission extends CRUDOptimisation {
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
        validate: {
          is: string
        }
      }
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
