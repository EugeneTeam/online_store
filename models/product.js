'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {PAGINATION} = require('../config/constants');
const {Op} = require('sequelize');

module.exports = class Product extends CRUDOptimisation {
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
        type: DataType.STRING
      },
      categoryId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Categories'
        },
        onDelete: 'CASCADE'
      },
      description: {
        allowNull: false,
        type: DataType.TEXT,
      },
      price: {
        allowNull: false,
        type: DataType.FLOAT,
      },
      discountId: {
        type: DataType.INTEGER,
        references: {
          model: 'Discounts'
        }
      },
      galleryId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Galleries'
        }
      },
      rating: {
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
    this.hasMany(models.FeatureProduct, {
      foreignKey: 'productId'
    });
    this.belongsTo(models.Gallery, {
      foreignKey: 'galleryId'
    });
    this.belongsTo(models.Discount, {
      foreignKey: 'discountId'
    });
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
    this.hasMany(models.OrderPart, {
      foreignKey: 'productId'
    });
  }

  static async getProductByFilter(params) {
    let priceFilter = [];
    // filter by price
    if (params.priceFrom) { priceFilter.push({[Op.gte]: params.priceFrom}); }
    // filter by price
    if (params.priceTo) { priceFilter.push({[Op.lte]: params.priceTo}); }
    const options = {
      // order
      ...(params.priceOrder ? {order: [['price', params.priceOrder]]} : null),
      // limit-offset
      ...(params.limit ? {limit: params.limit || PAGINATION.DEFAULT_LIMIT} : null),
      ...(params.offset ? {offset: params.offset || PAGINATION.DEFAULT_OFFSET} : null),
      where: {
        // filter by price
        ...(priceFilter.length ? {price: {[Op.and]: priceFilter}} : null),
        // filter by name
        ...(params.name ? {name: {[Op.like]: `%${params.name}%`}} : null),
        // product have discount
        ...(params.isHaveDiscount ? {discountId: {[Op.not]: null}} : null),
        // filter by category
        ...(params.categoryId ? {categoryId: params.categoryId} : null),
      },
      include: {
        model: this.sequelize.models.FeatureProduct,
        where: {
          // filter by characteristic
          ...(params.characteristicId ? {characteristicId: params.characteristicId} : null),
          // filter by value
          ...(params.valueId ? {valueId: params.valueId} : null),
        },
        required: true,
      }
    };

    return this.findAndCountAll(options);
  }
}
