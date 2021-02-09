'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class FeatureProduct extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      productId: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      characteristicId: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      valueId: {
        allowNull: false,
        type: DataType.INTEGER,
      },
    }, {
      sequelize,
      timestamp: false
    })
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
    this.belongsTo(models.Characteristic, {
      foreignKey: 'characteristicId'
    });
    this.belongsTo(models.Value, {
      foreignKey: 'valueId'
    });
  }
}
