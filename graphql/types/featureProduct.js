const models = require('../../models');

module.exports = class FeatureProduct {
    static resolver() {
        return {
            FeatureProduct: {
                value: featureProduct => featureProduct.getValue(),
                characteristic: featureProduct => featureProduct.getCharacteristic(),
                product: featureProduct => featureProduct.getProduct()
            },
            Mutation: {
                updateCharacteristicInProduct: async (obj, args) => {
                    const product = await models.Product.smartSearch({
                        options: args.productId
                    });
                    return models.FeatureProduct.updateItem({
                        options: {
                            where: {
                                productId: args.productId,
                                characteristicId: args.characteristicId,
                                valueId: args.valueId,
                            }
                        },
                        updatedItem: {
                            productId: args.productId,
                            characteristicId: args.newCharacteristicId,
                            valueId: args.newValueId
                        },
                        dependency: [
                            {
                                options: args.newCharacteristicId,
                                tableName: 'Characteristic',
                                errorIfElementDoesNotExist: true
                            },
                            {
                                tableName: 'CategoryCharacteristic',
                                options: {
                                    where: {
                                        characteristicId: args.newCharacteristicId,
                                        categoryId: product.categoryId
                                    },
                                },
                                errorIfElementDoesNotExist: true,
                                customErrorMessage: 'Characteristic not available for this product'
                            },
                            {
                                options: args.newValueId,
                                tableName: 'Value',
                                errorIfElementDoesNotExist: true,
                            },
                            {
                                tableName: 'CharacteristicValue',
                                options: {
                                    where: {
                                        characteristicId: args.characteristicId,
                                        valueId: args.newValueId
                                    }
                                },
                                errorIfElementDoesNotExist: true,
                                customErrorMessage: 'The value is not valid for this characteristic'
                            },
                            {
                                options: {
                                    where: {
                                        productId: args.productId,
                                        characteristicId: args.newCharacteristicId,
                                        valueId: args.newValueId,
                                    }
                                },
                                errorIfElementExists: true,
                                customErrorMessage: 'The product has these properties'
                            }
                        ]
                    });
                },
                addCharacteristicToProduct:  async (obj, args) => {
                    const product = await models.Product.smartSearch({
                        options: args.productId
                    });
                    return models.FeatureProduct.createItem({
                        item: {
                            productId: args.productId,
                            characteristicId: args.characteristicId,
                            valueId: args.valueId,
                        },
                        dependency: [
                            {
                                options: args.characteristicId,
                                tableName: 'Characteristic',
                                errorIfElementDoesNotExist: true
                            },
                            {
                                tableName: 'CategoryCharacteristic',
                                options: {
                                    where: {
                                        characteristicId: args.characteristicId,
                                        categoryId: product.categoryId
                                    },
                                },
                                errorIfElementDoesNotExist: true,
                                customErrorMessage: 'Characteristic not available for this product'
                            },
                            {
                                options: args.valueId,
                                tableName: 'Value',
                                errorIfElementDoesNotExist: true
                            },
                            {
                                tableName: 'CharacteristicValue',
                                options: {
                                    where: {
                                        characteristicId: args.characteristicId,
                                        valueId: args.valueId
                                    }
                                },
                                errorIfElementDoesNotExist: true,
                                customErrorMessage: 'The value is not valid for this characteristic'
                            },
                            {
                                options: {
                                    where: {
                                        productId: args.productId,
                                        characteristicId: args.characteristicId,
                                        valueId: args.valueId,
                                    }
                                },
                                errorIfElementExists: true,
                                customErrorMessage: 'The product has these properties'
                            }
                        ]
                    });
                },
                removeCharacteristicFromProduct: async (obj, args) => {
                    return models.FeatureProduct.removeItem({
                        options: {
                            where: {
                                productId: args.productId,
                                characteristicId: args.characteristicId,
                                valueId: args.valueId
                            }
                        }
                    });
                }
            }
        };
    }

    static typeDefs() {
        return `
            type FeatureProduct {
                value: Value
                characteristic: Characteristic
                product: Product
            }
            type FeatureProductList {
                count: Int
                rows: [FeatureProduct]
            }
        `;
    }

    static mutationTypeDefs() {
        return `
            updateCharacteristicInProduct(productId: Int!, characteristicId: Int!, valueId: Int!, newCharacteristicId: Int!, newValueId: Int!): FeatureProduct
            addCharacteristicToProduct(productId: Int!, characteristicId: Int!, valueId: Int!): FeatureProduct
            removeCharacteristicFromProduct(productId: Int!, characteristicId: Int!,  valueId: Int!): String
        `;
    }
}
