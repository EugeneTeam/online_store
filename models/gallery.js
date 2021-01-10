'use strict';
const {Model} = require('sequelize');

module.exports = class Gallery extends Model {
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
      productId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Products'
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
      foreignKey: 'productId'
    });
    this.belongsToMany(models.Image, {
      through: models.ImageGallery,
      foreignKey: 'galleryId'
    });
    this.hasMany(models.ImageGallery, {
      foreignKey: 'galleryId'
    });
  }
}
