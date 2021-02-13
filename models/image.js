'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class Image extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      url: {
        allowNull: false,
        type: DataType.STRING
      },
      title: DataType.STRING,
      alt: DataType.STRING,
      order: DataType.INTEGER,
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
    this.hasMany(models.ImageGallery, {
      foreignKey: 'imageId'
    });
    this.belongsToMany(models.Gallery, {
      through: models.ImageGallery,
      foreignKey: 'imageId'
    });
  }
}
