'use strict';
const {Model} = require('sequelize');

module.exports = class ImageGallery extends Model {
  static init(sequelize, DataType) {
    return super.init({
      imageId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        references: {
          model: 'Images'
        }
      },
      galleryId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        references: {
          model: 'Galleries'
        }
      },
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsTo(models.Image, {
      foreignKey: 'imageId'
    });
    this.belongsTo(models.Gallery, {
      foreignKey: 'galleryId'
    });
  }
}
