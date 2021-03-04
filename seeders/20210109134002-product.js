'use strict';
require('dotenv').config();
const {getRandom} = require('../utils/random');

function createOrder(name, categoryId, price, galleryId) {//TODO createProduct
    return {
        name,
        categoryId,
        description: 'some description...',//TODO lorem ipsum
        price,
        discountId: null,
        galleryId,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
        createOrder('AMD Ryzen 5 3600', 1, getRandom(1500, 20000),1),
        createOrder('INTEL Celeron G1620', 1, getRandom(1500, 20000),2),
        createOrder('AMD Ryzen 7 3700X', 1, getRandom(1500, 20000),3),
        createOrder('AMD Ryzen 9 5900X', 1, getRandom(1500, 20000),4),
        createOrder('INTEL Pentium Gold G6500', 1, getRandom(1500, 20000),5),

        createOrder('MSI GeForce GTX 1660 Ti Ventus XS 6G OC', 2, getRandom(1500, 20000),6),
        createOrder('POWERCOLOR Radeon RX 5700 XT', 2, getRandom(1500, 20000),7),
        createOrder('PALIT GeForce GTX 1660 Super GamingPro OC', 2, getRandom(1500, 20000),8),
        createOrder('AFOX GeForce GT 1030', 2, getRandom(1500, 20000),9),
        createOrder('AFOX GeForce GT 1030 2GB LP', 2, getRandom(1500, 20000),10),

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', {}, {});
  }
};
