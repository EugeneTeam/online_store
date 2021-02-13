'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Characteristics', [
        {name: 'Макс. частота ядра', createdAt: new Date(), updatedAt: new Date()},//1
        {name: 'Графический чип', createdAt: new Date(), updatedAt: new Date()},//2
        {name: 'Объём памяти', createdAt: new Date(), updatedAt: new Date()},//3
        {name: 'Эффективная частота памяти', createdAt: new Date(), updatedAt: new Date()},//4
        {name: 'Макс. поддерживаемое разрешение', createdAt: new Date(), updatedAt: new Date()},//5

        {name: 'Сокет', createdAt: new Date(), updatedAt: new Date()},//6
        {name: 'Количество ядер', createdAt: new Date(), updatedAt: new Date()},//7
        {name: 'Количество потоков', createdAt: new Date(), updatedAt: new Date()},//8
        {name: 'Частота процессора', createdAt: new Date(), updatedAt: new Date()},//9
        {name: 'Система охлаждения в комплекте', createdAt: new Date(), updatedAt: new Date()},//10
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Characteristics', {}, {});
  }
};
