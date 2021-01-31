'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {string} = require('../validation/duplicateValidations');

module.exports = class Category extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      name: {
        allowNull: false,
        type: DataType.STRING,
        validate: string
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
