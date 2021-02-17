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
      userId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Users'
        }
      },
      address: {
        allowNull: false,
        type: DataType.STRING
      },
      firstName: {
        allowNull: false,
        type: DataType.STRING
      },
      lastName: {
        allowNull: false,
        type: DataType.STRING
      },
      middleName: DataType.STRING,
      phone: {
        allowNull: false,
        type: DataType.STRING
      },
      paymentTypeId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'PaymentTypes'
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
    this.belongsTo(models.DeliveryType, {
      foreignKey: 'deliveryTypeId'
    });
    this.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    this.hasMany(models.OrderOrderPart, {
      foreignKey: 'orderId'
    });
    this.belongsToMany(models.OrderPart, {
      through: models.OrderOrderPart,
      foreignKey: 'orderId'
    });
    this.belongsTo(models.PaymentType, {
      foreignKey: 'paymentTypeId'
    });
  }
}
