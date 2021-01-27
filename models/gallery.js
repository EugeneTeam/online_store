'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {string} = require('../validation/duplicateValidations');

module.exports = class Gallery extends CRUDOptimisation {
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
        type: DataType.STRING,
        unique: true,
        validate: string
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
    this.hasOne(models.Product, {
      foreignKey: 'galleryId'
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
