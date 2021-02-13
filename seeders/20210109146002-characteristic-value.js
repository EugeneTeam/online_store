'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CharacteristicValues', [
        {characteristicId: 1, valueId: 1},
        {characteristicId: 1, valueId: 2},
        {characteristicId: 1, valueId: 3},
        {characteristicId: 1, valueId: 4},
        {characteristicId: 1, valueId: 5},

        {characteristicId: 2, valueId: 6},
        {characteristicId: 2, valueId: 7},
        {characteristicId: 2, valueId: 8},
        {characteristicId: 2, valueId: 9},

        {characteristicId: 3, valueId: 10},
        {characteristicId: 3, valueId: 11},
        {characteristicId: 3, valueId: 12},
        {characteristicId: 3, valueId: 13},

        {characteristicId: 4, valueId: 14},
        {characteristicId: 4, valueId: 15},
        {characteristicId: 4, valueId: 16},
        {characteristicId: 4, valueId: 17},
        {characteristicId: 4, valueId: 18},

        {characteristicId: 5, valueId: 19},
        {characteristicId: 5, valueId: 20},
        {characteristicId: 5, valueId: 21},
        {characteristicId: 5, valueId: 22},
        {characteristicId: 5, valueId: 23},

        {characteristicId: 6, valueId: 24},
        {characteristicId: 6, valueId: 25},
        {characteristicId: 6, valueId: 26},
        {characteristicId: 6, valueId: 27},
        {characteristicId: 6, valueId: 28},

        {characteristicId: 7, valueId: 29},
        {characteristicId: 7, valueId: 30},
        {characteristicId: 7, valueId: 31},
        {characteristicId: 7, valueId: 32},
        {characteristicId: 7, valueId: 33},

        {characteristicId: 8, valueId: 34},
        {characteristicId: 8, valueId: 35},
        {characteristicId: 8, valueId: 36},
        {characteristicId: 8, valueId: 37},
        {characteristicId: 8, valueId: 38},

        {characteristicId: 9, valueId: 39},
        {characteristicId: 9, valueId: 40},
        {characteristicId: 9, valueId: 41},
        {characteristicId: 9, valueId: 42},
        {characteristicId: 9, valueId: 43},

        {characteristicId: 10, valueId: 44},
        {characteristicId: 10, valueId: 45},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CharacteristicValues', {}, {});
  }
};
