const models = require('../../models');

module.exports = class CharacteristicValue {
    static resolver() {
        return {
            Mutation: {
                addValueForCharacteristic: async (obj, args) => {
                    await models.CharacteristicValue.createItem({//TODO задумайся о целях этой оптимизации: сократил ли ты кол-во строчек? Убра ли ты повторяющийся код? Упростил ли использование? Или чем эти методы лучше нативных?
                        item: {
                            characteristicId: args.characteristicId,
                            valueId: args.valueId,
                        },
                        dependency: [
                            {
                                options: args.valueId,
                                tableName: 'Value',
                                errorIfElementDoesNotExist: true,
                            },
                            {
                                options: args.characteristicId,
                                tableName: 'Characteristic',
                                errorIfElementDoesNotExist: true,
                            },
                            {
                                options: {
                                    where: {
                                        characteristicId: args.characteristicId,
                                        valueId: args.valueId,
                                    }
                                },
                                errorIfElementExists: true,
                                customErrorMessage: 'Value added to this characteristic'
                        }]
                    });
                    return models.Characteristic.smartSearch({options: args.characteristicId})
                },
            }
        };
    }
    static mutationTypeDefs() {
        return `
            addValueForCharacteristic(valueId: Int!, characteristicId: Int!): Characteristic
        `;
    }
}
