'use strict';
const {Model} = require('sequelize');

module.exports = class Discount extends Model {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      type: {
        allowNull: false,
        type: DataType.ENUM('PERCENT', 'SUM')
      },
      discount: {
        allowNull: false,
        type: DataType.FLOAT
      },
      expiredAt: {
        allowNull: false,
        type: DataType.DATE
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
    this.hasMany(models.Product, {
      foreignKey: 'discountId'
    });
    this.hasMany(models.OfferType, {
      foreignKey: 'discountId'
    })
  }
}
