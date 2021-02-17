'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
        {name: 'product create'},//1
        {name: 'product update'},//2
        {name: 'product delete'},//3
        {name: 'product show'},//4
        {name: 'category create'},//5
        {name: 'category update'},//6
        {name: 'category delete'},//7
        {name: 'category show'},//8
        {name: 'characteristic create'},//9
        {name: 'characteristic update'},//10
        {name: 'characteristic delete'},//11
        {name: 'characteristic show'},//12
        {name: 'value create'},//13
        {name: 'value update'},//14
        {name: 'value delete'},//15
        {name: 'value show'},//16
        {name: 'discount create'},//17
        {name: 'discount update'},//18
        {name: 'discount delete'},//19
        {name: 'discount show'},//20
        {name: 'featureProduct create'},//21
        {name: 'featureProduct update'},//22
        {name: 'featureProduct delete'},//23
        {name: 'featureProduct show'},//24
        {name: 'gallery create'},//25
        {name: 'gallery update'},//26
        {name: 'gallery delete'},//27
        {name: 'gallery show'},//28
        {name: 'image create'},//28
        {name: 'image update'},//29
        {name: 'image delete'},//30
        {name: 'image show'},//31
        {name: 'permission create'},//32
        {name: 'permission update'},//33
        {name: 'permission delete'},//34
        {name: 'permission show'},//35
        {name: 'role create'},//36
        {name: 'role update'},//37
        {name: 'role delete'},//38
        {name: 'role show'},//39
        {name: 'comment show'},//40
        {name: 'comment delete'},//41
        {name: 'deliveryType create'},//42
        {name: 'deliveryType update'},//43
        {name: 'deliveryType delete'},//44
        {name: 'deliveryType show'},//45
        {name: 'paymentType create'},//46
        {name: 'paymentType update'},//47
        {name: 'paymentType delete'},//48
        {name: 'paymentType show'},//49
        {name: 'order update'},//50
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', {}, {});
  }
};
