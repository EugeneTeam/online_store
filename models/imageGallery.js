'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class ImageGallery extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      imageId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        references: {
          model: 'Images'
        },
        onDelete: 'CASCADE'
      },
      galleryId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        references: {
          model: 'Galleries'
        },
        onDelete: 'CASCADE'
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
