'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      categoryId: {//TODO продукт может принадлежать нескольким категориям? Возможно здесь стоит указывать главную каегорию, по которой будем формировать урл продукта, а для остальных предусмотреть линковочную таблицу.
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories'
        },
        onDelete: 'CASCADE'
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      discountId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Discounts'
        }
      },
      galleryId: {//TODO товар может содержать несколько галлерей? и зачем нужны галлереи когда можно сделать связь изображений и товаров напрямую? Думаю галереи нужно убрать вообще
        type: Sequelize.INTEGER,
        references: {
          model: 'Galleries'
        }
      },
      rating: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
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
    await queryInterface.dropTable('Products');
  }
};
