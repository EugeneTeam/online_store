'use strict';
require('dotenv').config();
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Galleries', [
        {name: 'AMD Ryzen 5 3600 3.6GHz AM4 (100-100000031BOX)', createdAt: new Date(), updatedAt: new Date()},//1
        {name: 'INTEL Celeron G1620 2.7GHz s1155 (BX80637G1620)', createdAt: new Date(), updatedAt: new Date()},//2
        {name: 'AMD Ryzen 7 3700X 3.6GHz AM4 (100-100000071BOX)', createdAt: new Date(), updatedAt: new Date()},//3
        {name: 'AMD Ryzen 9 5900X 3.7GHz AM4 (100-100000061WOF)', createdAt: new Date(), updatedAt: new Date()},//4
        {name: 'INTEL Pentium Gold G6500 4.1GHz s1200 (BX80701G6500)', createdAt: new Date(), updatedAt: new Date()},//5

        {name: 'MSI GeForce GTX 1660 Ti Ventus XS 6G OC', createdAt: new Date(), updatedAt: new Date()},//6
        {name: 'POWERCOLOR Radeon RX 5700 XT (AXRX 5700 XT 8GBD6-3DH)', createdAt: new Date(), updatedAt: new Date()},//7
        {name: 'PALIT GeForce GTX 1660 Super GamingPro OC (NE6166SS18J9-1160A)', createdAt: new Date(), updatedAt: new Date()},//8
        {name: 'AFOX GeForce GT 1030 (AF1030-2048D5L5)', createdAt: new Date(), updatedAt: new Date()},//9
        {name: 'AFOX GeForce GT1030 2GB LP (V4) (AF1030-2048D3L4)', createdAt: new Date(), updatedAt: new Date()},//10
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Galleries', {}, {});
  }
};
