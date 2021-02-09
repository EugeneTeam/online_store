const models = require('../../models');
const {PAGINATION} = require('../../config/constants');
const {Op} = require('sequelize');

module.exports = class Characteristic {
    static resolver() {
        return {
            Query: {
                getCharacteristicById: async(obj, args) => {
                    return models.Characteristic.smartSearch({options: args.characteristicId, error: true})
                },
                getCharacteristicList: async(obj, args) => {
                    return models.Characteristic.smartSearch({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET
                        },
                        count: true
                    })
                }
            },
            Characteristic:{
              values: characteristic => characteristic.getValues(),
            },
            Mutation: {
                createCharacteristic: async(obj, args) => {
                    return models.Characteristic.createItem({
                        item: {
                            name: args.name,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [{
                            options: {
                                where: {name: args.name}
                            },
                            error: true,
                            message: `Characteristic "${args.name}" is exists`
                        }]
                    })
                },
                updateCharacteristic: async(obj, args) => {
                    return models.Characteristic.updateItem({
                        options: args.characteristicId,
                        updatedItem: {
                            name: args.name,
                            updatedAt: new Date()
                        },
                        dependency: [
                            {options: args.characteristicId},
                            {
                                options: {
                                    where: {name: args.name}
                                },
                                error: true,
                                message: `"${args.name}" is used`
                            }
                        ]
                    })
                },
                removeCharacteristic: async(obj, args) => {
                    return models.Characteristic.removeItem({
                        options: args.characteristicId
                    })
                },
                bulkDeleteCharacteristic: async(obj, args) => {
                    return models.Characteristic.destroy({
                        where: {
                            id: {
                                [Op.in]: args.characteristicIds
                            }
                        }
                    });
                }
            }
        }
    }

    static typeDefs() {
        return `
           type Characteristic { 
                id: Int
                name: String
                createdAt: String
                updatedAt: String
                values: [Value]
           }
           type CharacteristicList {
                count: Int
                rows: [Characteristic]
           }
        `;
    }

    static mutationTypeDefs() {
        return `
            createCharacteristic(name: String!): Characteristic
            updateCharacteristic(characteristicId: Int!, name: String!): Characteristic
            removeCharacteristic(characteristicId: Int!): String
            bulkDeleteCharacteristic(characteristicIds: [Int]!): Int
        `;
    }

    static queryTypeDefs() {
        return `
            getCharacteristicById(characteristicId: Int): Characteristic
            getCharacteristicList(limit: Int, offset: Int): CharacteristicList
        `;
    }
}
