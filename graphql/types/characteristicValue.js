const models = require('../../models');

module.exports = class CharacteristicValue {
    static resolver() {
        return {
            Mutation: {
                addValueForCharacteristic: async (obj, args) => {
                    await models.CharacteristicValue.createItem({
                        item: {
                            characteristicId: args.characteristicId,
                            valueId: args.valueId,
                        },
                        dependency: [
                            {options: args.valueId, table: 'Value'},
                            {options: args.characteristicId, table: 'Characteristic'},
                            {
                            options: {
                                where: {
                                    characteristicId: args.characteristicId,
                                    valueId: args.valueId,
                                }
                            },
                            error: true,
                            message: 'Value added to this characteristic'
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
