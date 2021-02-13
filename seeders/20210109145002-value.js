'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Values', [
        {value: '1930 МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//1
        {value: '1830 МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//2
        {value: '1730 МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//3
        {value: '1630 МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//4
        {value: '1530 МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//5

        {value: 'GTX 1660 Ti', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//6
        {value: 'RX 5700 XT', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//7
        {value: 'GTX 1660 Super', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//8
        {value: 'GT 1030', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//9

        {value: '512', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//10
        {value: '1024', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//11
        {value: '2048', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//12
        {value: '8192', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//13

        {value: '10000МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//14
        {value: '11000МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//15
        {value: '12000МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//16
        {value: '13000МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//17
        {value: '14000МГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//18

        {value: '1200 х 800', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//19
        {value: '1440 х 900', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//20
        {value: '1680 х 1050', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//21
        {value: '1920 х 1080', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//22
        {value: '2048 х 1536', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//23
        ////
        {value: 'LGA1150', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//24
        {value: 'LGA1151', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//25
        {value: 'AM4', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//26
        {value: 'FM2', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//27
        {value: 'FM2+', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//28

        {value: '2', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//29
        {value: '4', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//30
        {value: '6', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//31
        {value: '8', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//32
        {value: '10', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//33

        {value: '4', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//34
        {value: '8', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//35
        {value: '12', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//36
        {value: '16', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//37
        {value: '20', type: 'NUMBER', createdAt: new Date(), updatedAt: new Date()},//38

        {value: '2.5ГГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//39
        {value: '2.9ГГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//40
        {value: '3.3ГГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//41
        {value: '4ГГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//42
        {value: '4.4ГГц', type: 'STRING', createdAt: new Date(), updatedAt: new Date()},//43

        {value: 'отсутствует', type: 'BOOLEAN', createdAt: new Date(), updatedAt: new Date()},//44
        {value: 'присутствует', type: 'BOOLEAN', createdAt: new Date(), updatedAt: new Date()},//45
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Values', {}, {});
  }
};
