'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class Value extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      type: {
        allowNull: false,
        type: DataType.ENUM('NUMBER', 'STRING', 'BOOLEAN')
      },
      value: {
        allowNull: false,
        type: DataType.STRING
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
    this.belongsToMany(models.Characteristic, {
      through: models.CharacteristicValue,
      foreignKey: 'valueId'
    });
    this.hasMany(models.CharacteristicValue, {
      foreignKey: 'valueId'
    });
    this.hasMany(models.FeatureProduct, {
      foreignKey: 'valueId'
    });
  }
}
