'use strict';
const {Model} = require('sequelize');
const {string} = require('../validation/duplicateValidations');

module.exports = class Characteristic extends Model {
  static init(sequelize, DataType) {
    return super.init({
      name: {
        allowNull: false,
        type: DataType.STRING,
        validate: string
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE,
      }
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.Value, {
      through: models.CharacteristicValue,
      foreignKey: 'characteristicId'
    });
    this.hasMany(models.CharacteristicValue, {
      foreignKey: 'characteristicId'
    });

    this.belongsToMany(models.Category, {
      through: models.CategoryCharacteristic,
      foreignKey: 'characteristicId',
    });
    this.hasMany(models.CategoryCharacteristic, {
      foreignKey: 'characteristicId',
      as: 'categoryChId'
    });
    this.hasMany(models.FeatureProduct, {
      foreignKey: 'characteristicId'
    });
  }
}
