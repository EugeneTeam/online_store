'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class FeatureProduct extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      productId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      characteristicId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Characteristics'
        },
        onDelete: 'CASCADE'
      },
      valueId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Values'
        },
        onDelete: 'CASCADE'
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
