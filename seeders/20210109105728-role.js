'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
        // полный доступ
        {name: 'admin'},
        // только просмотр
        {name: 'customer'},
        // создание товара, категорий, характеристик и значений
        {name: 'product manager'},
        // создание галерей и загрузка картинок
        {name: 'media manager'},
        // создание конечного продукта + скидки
        {name: 'feature product manager'}
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', {name: [
        'admin', 'customer', 'product manager', 'media manager', 'feature product manager'
      ]}, {});
  }
};
