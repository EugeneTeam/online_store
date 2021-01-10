'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OfferTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(
            'PLUS_SOME',
            'FREE',
            'MORE',
            'EVERY',
            'OTHER_PRODUCT'
            )
      },
      // for PLUS_SOME
      count: Sequelize.INTEGER,
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products'
        }
      },
      // for FREE, OTHER_PRODUCT
      productIdOnOffer: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products'
        }
      },
      //for MORE, EVERY, OTHER_PRODUCT
      discountId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Discounts'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OfferTypes');
  }
};
