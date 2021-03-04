'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
        {//1
            userId: 1,
            productId: 1,
            limitations: 'Обэма',
            dignity: 'цена/уачество',
            text: 'Отличный процессор за свои деньги',
            rating: 5,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//2
            userId: 2,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'Категорически с вами не согласен',
            rating: 0,
            parentId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//3
            userId: 1,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'Поясните свою точку зрения',
            rating: 0,
            parentId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//4
            userId: 2,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა',//TODO гг
            rating: 0,
            parentId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//5
            userId: 1,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'տպագրության և տպագրական արդյունաբերության համար նախատեսված մոդելային տեքստ է: Սկսած 1500-ականներից',
            rating: 0,
            parentId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//6
            userId: 3,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'НЕДОСТЕЖИМЫЙ КОММЕНТАРИЙ 1',
            rating: 0,
            parentId: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//7
            userId: 3,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'НЕДОСТЕЖИМЫЙ КОММЕНТАРИЙ 2',
            rating: 0,
            parentId: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//8
            userId: 4,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'НЕДОСТЕЖИМЫЙ КОММЕНТАРИЙ 1',
            rating: 0,
            parentId: 6,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {//9
            userId: 4,
            productId: 1,
            limitations: null,
            dignity: null,
            text: 'НЕДОСТЕЖИМЫЙ КОММЕНТАРИЙ 2',
            rating: 0,
            parentId: 6,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', {}, {});
  }
};
