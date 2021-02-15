'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class PaymentType extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataType.STRING
      },
      status: {
        allowNull: false,
        type: DataType.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'INACTIVE'
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
      foreignKey: 'paymentTypeId'
    });
  }
}
