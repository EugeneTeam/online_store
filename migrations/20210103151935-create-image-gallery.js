'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ImageGalleries', {
      imageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Images'
        },
        onDelete: 'CASCADE'
      },
      galleryId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Galleries'
        },
        onDelete: 'CASCADE'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ImageGalleries');
  }
};
