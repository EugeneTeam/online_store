'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class DeliveryType extends CRUDOptimisation {
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
        type: DataType.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'INACTIVE'
      },
      name: {
        allowNull: false,
        type: DataType.STRING
      },
      price: {
        allowNull: false,
        type: DataType.FLOAT,
        defaultValue: 0
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
    this.hasMany(models.Order, {
      foreignKey: 'deliveryTypeId'
    });
  }
}
