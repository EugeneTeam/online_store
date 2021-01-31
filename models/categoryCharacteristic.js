'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class CategoryCharacteristic extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      categoryId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        onDelete: 'CASCADE'
      },
      characteristicId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        onDelete: 'CASCADE'
      },
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
    this.belongsTo(models.Characteristic, {
      foreignKey: 'characteristicId',
      as: 'categoryChId'
    });
  }
}
