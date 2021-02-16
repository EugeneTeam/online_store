'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Values', [
        {value: '1930 МГц', createdAt: new Date(), updatedAt: new Date()},//1
        {value: '1830 МГц', createdAt: new Date(), updatedAt: new Date()},//2
        {value: '1730 МГц', createdAt: new Date(), updatedAt: new Date()},//3
        {value: '1630 МГц', createdAt: new Date(), updatedAt: new Date()},//4
        {value: '1530 МГц', createdAt: new Date(), updatedAt: new Date()},//5

        {value: 'GTX 1660 Ti', createdAt: new Date(), updatedAt: new Date()},//6
        {value: 'RX 5700 XT', createdAt: new Date(), updatedAt: new Date()},//7
        {value: 'GTX 1660 Super', createdAt: new Date(), updatedAt: new Date()},//8
        {value: 'GT 1030', createdAt: new Date(), updatedAt: new Date()},//9

        {value: '512', createdAt: new Date(), updatedAt: new Date()},//10
        {value: '1024', createdAt: new Date(), updatedAt: new Date()},//11
        {value: '2048', createdAt: new Date(), updatedAt: new Date()},//12
        {value: '8192', createdAt: new Date(), updatedAt: new Date()},//13

        {value: '10000МГц', createdAt: new Date(), updatedAt: new Date()},//14
        {value: '11000МГц', createdAt: new Date(), updatedAt: new Date()},//15
        {value: '12000МГц', createdAt: new Date(), updatedAt: new Date()},//16
        {value: '13000МГц', createdAt: new Date(), updatedAt: new Date()},//17
        {value: '14000МГц', createdAt: new Date(), updatedAt: new Date()},//18

        {value: '1200 х 800', createdAt: new Date(), updatedAt: new Date()},//19
        {value: '1440 х 900', createdAt: new Date(), updatedAt: new Date()},//20
        {value: '1680 х 1050', createdAt: new Date(), updatedAt: new Date()},//21
        {value: '1920 х 1080', createdAt: new Date(), updatedAt: new Date()},//22
        {value: '2048 х 1536', createdAt: new Date(), updatedAt: new Date()},//23
        ////
        {value: 'LGA1150', createdAt: new Date(), updatedAt: new Date()},//24
        {value: 'LGA1151', createdAt: new Date(), updatedAt: new Date()},//25
        {value: 'AM4', createdAt: new Date(), updatedAt: new Date()},//26
        {value: 'FM2', createdAt: new Date(), updatedAt: new Date()},//27
        {value: 'FM2+', createdAt: new Date(), updatedAt: new Date()},//28

        {value: '2', createdAt: new Date(), updatedAt: new Date()},//29
        {value: '4', createdAt: new Date(), updatedAt: new Date()},//30
        {value: '6', createdAt: new Date(), updatedAt: new Date()},//31
        {value: '8', createdAt: new Date(), updatedAt: new Date()},//32
        {value: '10', createdAt: new Date(), updatedAt: new Date()},//33

        {value: '4', createdAt: new Date(), updatedAt: new Date()},//34
        {value: '8', createdAt: new Date(), updatedAt: new Date()},//35
        {value: '12', createdAt: new Date(), updatedAt: new Date()},//36
        {value: '16', createdAt: new Date(), updatedAt: new Date()},//37
        {value: '20', createdAt: new Date(), updatedAt: new Date()},//38

        {value: '2.5ГГц', createdAt: new Date(), updatedAt: new Date()},//39
        {value: '2.9ГГц', createdAt: new Date(), updatedAt: new Date()},//40
        {value: '3.3ГГц', createdAt: new Date(), updatedAt: new Date()},//41
        {value: '4ГГц', createdAt: new Date(), updatedAt: new Date()},//42
        {value: '4.4ГГц', createdAt: new Date(), updatedAt: new Date()},//43

        {value: 'отсутствует', createdAt: new Date(), updatedAt: new Date()},//44
        {value: 'присутствует', createdAt: new Date(), updatedAt: new Date()},//45
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Values', {}, {});
  }
};
