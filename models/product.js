'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

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
  }
}
