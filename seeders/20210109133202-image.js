'use strict';
require('dotenv').config();
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Images', [
        {url: 'https://i.can.ua/goods/5463/5463629.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//1
        {url: 'https://i.can.ua/goods/5463/5463639.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//2
        {url: 'https://i.can.ua/goods/5463/5463649.jpg', order: 3, createdAt: new Date(), updatedAt: new Date()},//3

        {url: 'https://i.can.ua/goods/105/105471.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//4

        {url: 'https://i.can.ua/images/700x700/goods/5507/5507930.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//5
        {url: 'https://i.can.ua/images/700x700/goods/5507/5507940.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//6
        {url: 'https://i.can.ua/images/700x700/goods/5507/5507950.jpg', order: 3, createdAt: new Date(), updatedAt: new Date()},//7

        {url: 'https://i.can.ua/images/700x700/goods/7518/7518841.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//8
        {url: 'https://i.can.ua/images/700x700/goods/7529/7529001.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//9

        {url: 'https://i.can.ua/images/700x700/goods/7632/7632262.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//10

        {url: 'https://i.can.ua/goods/5044/5044793.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//11
        {url: 'https://i.can.ua/goods/5044/5044803.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//12
        {url: 'https://i.can.ua/goods/5044/5044813.jpg', order: 3, createdAt: new Date(), updatedAt: new Date()},//13
        {url: 'https://i.can.ua/goods/5044/5044823.jpg', order: 4, createdAt: new Date(), updatedAt: new Date()},//14
        {url: 'https://i.can.ua/goods/5044/5044833.jpg', order: 5, createdAt: new Date(), updatedAt: new Date()},//15

        {url: 'https://i.can.ua/goods/5815/5815593.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//16
        {url: 'https://i.can.ua/goods/5815/5815603.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//17
        {url: 'https://i.can.ua/images/700x700/goods/5815/5815613.jpg', order: 3, createdAt: new Date(), updatedAt: new Date()},//18
        {url: 'https://i.can.ua/goods/5815/5815623.jpg', order: 4, createdAt: new Date(), updatedAt: new Date()},//19
        {url: 'https://i.can.ua/images/700x700/goods/5815/5815633.jpg', order: 5, createdAt: new Date(), updatedAt: new Date()},//20

        {url: 'https://i.can.ua/images/700x700/goods/5941/5941863.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//21
        {url: 'https://i.can.ua/images/700x700/goods/5941/5941873.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//22
        {url: 'https://i.can.ua/goods/5941/5941883.jpg', order: 3, createdAt: new Date(), updatedAt: new Date()},//23
        {url: 'https://i.can.ua/images/700x700/goods/5941/5941893.jpg', order: 4, createdAt: new Date(), updatedAt: new Date()},//24
        {url: 'https://i.can.ua/images/700x700/goods/5941/5941903.jpg', order: 5, createdAt: new Date(), updatedAt: new Date()},//25
        {url: 'https://i.can.ua/images/700x700/goods/5941/5941913.jpg', order: 6, createdAt: new Date(), updatedAt: new Date()},//26

        {url: 'https://i.can.ua/goods/7802/7802104.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//27
        {url: 'https://i.can.ua/goods/7802/7802114.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//28

        {url: 'https://i.can.ua/images/700x700/goods/7804/7804914.jpg', order: 1, createdAt: new Date(), updatedAt: new Date()},//29
        {url: 'https://i.can.ua/goods/7804/7804924.jpg', order: 2, createdAt: new Date(), updatedAt: new Date()},//30
        {url: 'https://i.can.ua/images/700x700/goods/7804/7804934.jpg', order: 3, createdAt: new Date(), updatedAt: new Date()},//31

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Images', {}, {});
  }
};
