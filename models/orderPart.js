'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class OrderPart extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      productId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Products'
        }
      },
      quantity: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE,
        defaultValue: DataType.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE,
        defaultValue: DataType.literal('CURRENT_TIMESTAMP'),
      }
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
    this.hasMany(models.OrderOrderPart, {
      foreignKey: 'orderPartId'
    });
    this.belongsToMany(models.Order, {
      through: models.OrderOrderPart,
      foreignKey: 'orderPartId'
    });
  }
}
