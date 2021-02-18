'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class OrderPart extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      productId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Products'
        },
        onDelete: 'CASCADE'
      },
      quantity: {
        allowNull: false,
        type: DataType.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Users'
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
    this.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
    this.hasMany(models.OrderOrderPart, {
      foreignKey: 'orderPartId'
    });
    this.belongsToMany(models.Order, {
      through: models.OrderOrderPart,
      foreignKey: 'orderPartId'
    });
    this.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  }
}
