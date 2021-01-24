'use strict';
const {Model} = require('sequelize');

module.exports = class Permission extends Model {
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
          is: /&[a-zA-Z ]{3,15}$/g
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
