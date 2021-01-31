const models = require('../../models');

module.exports = class CategoryCharacteristic {
    static resolver() {
        return {
            Mutation: {
                addCharacteristicForCategory: async (obj, args) => {
                    await models.CategoryCharacteristic.createItem({
                        item: {
                            characteristicId: args.characteristicId,
                            categoryId: args.categoryId,
                        },
                        dependency: [
                            {options: args.categoryId, table: 'Category'},
                            {options: args.characteristicId, table: 'Characteristic'},
                            {
                            options: {
                                where: {
                                    characteristicId: args.characteristicId,
                                    categoryId: args.categoryId,
                                }
                            },
                            error: true,
                            message: 'Characteristic added to this category'
                        }]
                    });
                    return models.Category.findItem({options: args.categoryId})
                },
                addCharacteristicsForCategory: async (obj, args) => {
                    if (args.characteristicIds.length) {
                        await models.sequelize.transaction(async transaction => {
                            for (const id of args.characteristicIds) {
                                await models.CategoryCharacteristic.createItem({
                                    item: {
                                        characteristicId: id,
                                        categoryId: args.categoryId,
                                    },
                                    transaction,
                                    dependency: [
                                        {options: args.categoryId, table: 'Category'},
                                        {options: id, table: 'Characteristic'},
                                        {
                                        options: {
                                            where: {
                                                characteristicId: id,
                                                categoryId: args.categoryId,
                                            }
                                        },
                                        error: true,
                                        message: `Characteristic (Id:${id}) added to this category`
                                    }]
                                })
                            }
                        })
                    }
                    return models.Category.findItem({options: args.categoryId})
                }
            }
        };
    }
    static mutationTypeDefs() {
        return `
            addCharacteristicForCategory(categoryId: Int!, characteristicId: Int!): Category
            addCharacteristicsForCategory(categoryId: Int!, characteristicIds: [Int]!): Category
        `;
    }
}
