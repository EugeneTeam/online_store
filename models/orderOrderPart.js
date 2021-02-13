'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class OrderOrderPart extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      orderId: {
        allowNull: false,
        type: DataType.INTEGER,
        primaryKey: true,
        references: {
          model: 'Orders'
        }
      },
      orderPartId: {
        allowNull: false,
        type: DataType.INTEGER,
        primaryKey: true,
        references: {
          model: 'OrderParts'
        }
      }
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'orderId'
    });
    this.belongsTo(models.OrderPart, {
      foreignKey: 'orderPartId'
    });
  }
}
