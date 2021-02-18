'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {string} = require('../validation/duplicateValidations');

module.exports = class Bookmark extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      userId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'CASCADE'
      },
      productId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Products'
        },
        onDelete: 'CASCADE'
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
    this.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
  }
}
