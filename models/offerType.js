'use strict';
const {Model} = require('sequelize');

module.exports = class OfferType extends Model {
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
        type: DataType.ENUM(
            'PLUS_SOME',
            'FREE',
            'MORE',
            'EVERY',
            'OTHER_PRODUCT'
        )
      },
      // for PLUS_SOME
      count: DataType.INTEGER,
      productId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Products'
        }
      },
      // for FREE, OTHER_PRODUCT
      productIdOnOffer: {
        type: DataType.INTEGER,
        references: {
          model: 'Products'
        }
      },
      //for MORE, EVERY, OTHER_PRODUCT
      discountId: {
        type: DataType.INTEGER,
        references: {
          model: 'Discounts'
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
    this.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'mainProduct'
    });
    this.belongsTo(models.Product, {
      foreignKey: 'productIdOnOffer',
      as: 'secondaryProduct'
    });
    this.belongsTo(models.Discount, {
      foreignKey: 'discountId'
    });
    this.hasMany(models.Offer, {
      foreignKey: 'offerTypeId'
    });
  }
}
