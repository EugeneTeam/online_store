'use strict';
require('dotenv').config();
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ImageGalleries', [
        {galleryId: 1, imageId: 1},
        {galleryId: 1, imageId: 2},
        {galleryId: 1, imageId: 3},

        {galleryId: 2, imageId: 4},

        {galleryId: 3, imageId: 5},
        {galleryId: 3, imageId: 6},
        {galleryId: 3, imageId: 7},

        {galleryId: 4, imageId: 8},
        {galleryId: 4, imageId: 9},

        {galleryId: 5, imageId: 10},

        {galleryId: 6, imageId: 11},
        {galleryId: 6, imageId: 12},
        {galleryId: 6, imageId: 13},
        {galleryId: 6, imageId: 14},
        {galleryId: 6, imageId: 15},

        {galleryId: 7, imageId: 16},
        {galleryId: 7, imageId: 17},
        {galleryId: 7, imageId: 18},
        {galleryId: 7, imageId: 19},
        {galleryId: 7, imageId: 20},

        {galleryId: 8, imageId: 21},
        {galleryId: 8, imageId: 22},
        {galleryId: 8, imageId: 23},
        {galleryId: 8, imageId: 24},
        {galleryId: 8, imageId: 25},
        {galleryId: 8, imageId: 26},

        {galleryId: 9, imageId: 27},
        {galleryId: 9, imageId: 28},

        {galleryId: 10, imageId: 29},
        {galleryId: 10, imageId: 30},
        {galleryId: 10, imageId: 31},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ImageGalleries', {}, {});
  }
};
