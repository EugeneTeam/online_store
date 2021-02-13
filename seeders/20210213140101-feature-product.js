'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FeatureProducts', [
        {productId: 1, characteristicId: 6, valueId: 26},
        {productId: 1, characteristicId: 7, valueId: 31},
        {productId: 1, characteristicId: 8, valueId: 36},
        {productId: 1, characteristicId: 9, valueId: 41},
        {productId: 1, characteristicId: 10, valueId: 44},

        {productId: 2, characteristicId: 6, valueId: 27},
        {productId: 2, characteristicId: 7, valueId: 29},
        {productId: 2, characteristicId: 8, valueId: 34},
        {productId: 2, characteristicId: 9, valueId: 34},
        {productId: 2, characteristicId: 10, valueId: 44},

        {productId: 3, characteristicId: 6, valueId: 26},
        {productId: 3, characteristicId: 7, valueId: 32},
        {productId: 3, characteristicId: 8, valueId: 37},
        {productId: 3, characteristicId: 9, valueId: 42},
        {productId: 3, characteristicId: 10, valueId: 45},

        {productId: 6, characteristicId: 1, valueId: 2},
        {productId: 6, characteristicId: 2, valueId: 6},
        {productId: 6, characteristicId: 3, valueId: 12},
        {productId: 6, characteristicId: 4, valueId: 17},
        {productId: 6, characteristicId: 5, valueId: 22},

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FeatureProducts', {}, {});
  }
};
