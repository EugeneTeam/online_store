'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CategoryCharacteristics', [
        {categoryId: 2, characteristicId: 2},
        {categoryId: 2, characteristicId: 3},
        {categoryId: 2, characteristicId: 4},
        {categoryId: 2, characteristicId: 5},
        {categoryId: 2, characteristicId: 1},

        {categoryId: 1, characteristicId: 6},
        {categoryId: 1, characteristicId: 7},
        {categoryId: 1, characteristicId: 8},
        {categoryId: 1, characteristicId: 9},
        {categoryId: 1, characteristicId: 10},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CategoryCharacteristics', {}, {});
  }
};
