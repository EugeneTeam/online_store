'use strict';
const {Model} = require('sequelize');

module.exports = class Offer extends Model {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      description: {
        allowNull: false,
        type: DataType.TEXT
      },
      offerTypeId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'OfferTypes'
        }
      },
      quantity: DataType.INTEGER,
      expiredAt: DataType.DATE,
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
    this.belongsTo(models.OfferType, {
      foreignKey: 'offerTypeId'
    });
  }
}
