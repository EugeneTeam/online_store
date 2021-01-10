'use strict';
const {Model} = require('sequelize');

module.exports = class Image extends Model {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      urt: {
        allowNull: false,
        type: DataType.STRING
      },
      title: DataType.STRING,
      alt: DataType.STRING,
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
