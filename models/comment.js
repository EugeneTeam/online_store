'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {NUMBER_OF_COMMENTS_IN_A_BATCH} = require('../config/constants');

module.exports = class Comment extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataType.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'CASCADE'
      },
      productId: {
        allowNull: true,
        type: DataType.INTEGER,
        references: {
          model: 'Products'
        },
        onDelete: 'CASCADE'
      },
      limitations: DataType.STRING,
      dignity: DataType.STRING,
      text: {
        allowNull: false,
        type: DataType.TEXT
      },
      rating: DataType.FLOAT,
      parentId: {
        type: DataType.INTEGER,
        references: {
          model: 'Comments'
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
      sequelize,
      hooks: {
        afterCreate(comment) {
          this.models.Comment.findAll({
            where: {
              productId: comment.productId,
            }
          }).then(async response => {
            const product = await this.models.Product.findByPk(comment.productId);
            let totalRating = 0;
            let commentCount = 0;
            response.filter(item => item.rating > 0).forEach(item => {
              commentCount++;
              totalRating += item.rating;
            });
            if (product) {
              await product.update({
                rating: totalRating / commentCount
              });
            }
          })
        }
      }
    })
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    this.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
    this.belongsTo(models.Comment, {
      foreignKey: 'parentId',
      as: 'child'
    });
  }

  static async getChildList(id = null, iterations = NUMBER_OF_COMMENTS_IN_A_BATCH) {
    const comments = await this.sequelize.models.Comment.findAll({
      where: {
        parentId: id,
      }
    });

    if (iterations <= 0) {
      return comments;
    }

    if (!comments.length) {
      return [];
    }

    for (const comment of comments) {
      comment.child = await this.getChildList(comment.id, --iterations);
    }

    return comments;
  }
}
