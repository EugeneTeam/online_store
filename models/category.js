'use strict';
const {Model} = require('sequelize');

module.exports = class Category extends Model {
  static init(sequelize, DataType) {
    return super.init({
      name: {
        allowNull: false,
        type: DataType.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE
      }
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.Characteristic, {
      through: models.CategoryCharacteristic,
      foreignKey: 'categoryId',
    });
    this.hasMany(models.CategoryCharacteristic, {
      foreignKey: 'categoryId'
    });
  }
}
