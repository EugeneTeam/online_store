'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class Order extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      status: {
        allowNull: false,
        type: DataType.ENUM('NEW', 'BEING_FORMED', 'SENT', 'CANCELED'),
        defaultValue: 'NEW'
      },
      receiverId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Users'
        }
      },
      deliveryTypeId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'DeliveryTypes'
        }
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
    this.belongsTo(models.DeliveryType, {
      foreignKey: 'deliveryTypeId'
    });
    this.belongsTo(models.User, {
      foreignKey: 'receiverId'
    });
    this.hasMany(models.OrderOrderPart, {
      foreignKey: 'orderId'
    });
    this.belongsToMany(models.OrderPart, {
      through: models.OrderOrderPart,
      foreignKey: 'orderId'
    })
  }
}
