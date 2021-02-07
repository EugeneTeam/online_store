const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class FeatureProduct {
    static resolver() {
        return {
            Query: {
              getFeatureProductByProductId: async (obj, args) => {
                  return models.FeatureProduct.findItem({
                      options: {
                          where: {
                              productId: args.productId
                          }
                      },
                      error: true
                  })
              },
              getFeatureProductByValueId: async (obj, args) => {
                  return models.FeatureProduct.findItem({
                      options: {
                          where: {
                              valueId: args.valueId
                          }
                      },
                      error: true
                  })
              },
              getFeatureProductByCharacteristicId: async (obj, args) => {
                  return models.FeatureProduct.findItem({
                      options: {
                          where: {
                              characteristicId: args.characteristicId
                          }
                      },
                      error: true
                  })
              },
              getFeatureProductList: async (obj, args) => {
                  return models.FeatureProduct.findItem({
                      options: {
                          limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                          offset: args.offset || PAGINATION.DEFAULT_OFFSET
                      },
                      count: true
                  })
              },
            },
            FeatureProduct: {
                value: featureProduct => featureProduct.getValue(),
                characteristic: featureProduct => featureProduct.getCharacteristic(),
            },
            Mutation: {
                updateCharacteristicInProduct: async (obj, args) => {
                    const product = await models.Product.findItem({options: args.productId, error: true});
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
                            valueId: args.newValueId,
                            updatedAt: new Date()
                        },
                        dependency: [
                            // if characteristic exists
                            {options: args.newCharacteristicId, table: 'Characteristic'},
                            // if characteristic available in this category
                            {
                                table: 'CategoryCharacteristic',
                                options: {
                                    where: {
                                        characteristicId: args.newCharacteristicId,
                                        categoryId: product.categoryId
                                    },
                                },
                                message: 'Characteristic not available for this product'
                            },
                            // if value exists
                            {options: args.newValueId, table: 'Value'},
                            // if value available in this characteristic
                            {
                                table: 'CharacteristicValue',
                                options: {
                                    where: {
                                        characteristicId: args.characteristicId,
                                        valueId: args.newValueId
                                    }
                                },
                                message: 'The value is not valid for this characteristic'
                            },
                            // if this property is not added to this product
                            {
                                options: {
                                    where: {
                                        productId: args.productId,
                                        characteristicId: args.newCharacteristicId,
                                        valueId: args.newValueId,
                                    }
                                },
                                error: true,
                                message: 'The product has these properties'
                            }
                        ]
                    })
                },
                addCharacteristicToProduct:  async (obj, args) => {
                    const product = await models.Product.findItem({options: args.productId, error: true});
                    return models.FeatureProduct.createItem({
                        item: {
                            productId: args.productId,
                            characteristicId: args.characteristicId,
                            valueId: args.valueId,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [
                            {options: args.characteristicId, table: 'Characteristic'},
                            {
                                table: 'CategoryCharacteristic',
                                options: {
                                    where: {
                                        characteristicId: args.characteristicId,
                                        categoryId: product.categoryId
                                    },
                                },
                                message: 'Characteristic not available for this product'
                            },
                            {options: args.valueId, table: 'Value'},
                            {
                                table: 'CharacteristicValue',
                                options: {
                                    where: {
                                        characteristicId: args.characteristicId,
                                        valueId: args.valueId
                                    }
                                },
                                message: 'The value is not valid for this characteristic'
                            },
                            {
                                options: {
                                    where: {
                                        productId: args.productId,
                                        characteristicId: args.characteristicId,
                                        valueId: args.valueId,
                                    }
                                },
                                error: true,
                                message: 'The product has these properties'
                            }
                        ]
                    })
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
                    })
                }
            }
        };
    }

    static typeDefs() {
        return `
            type FeatureProduct {
                productId: Int
                characteristicId: Int
                valueId: Int
                createdAt: String
                updatedAt: String
                value: Value
                characteristic: Characteristic
            }
            type FeatureProductList {
                count: Int
                rows: [FeatureProduct]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getFeatureProductByProductId(productId: Int!): FeatureProduct
            getFeatureProductByValueId(valueId: Int!): FeatureProduct
            getFeatureProductByCharacteristicId(characteristicId: Int): FeatureProduct
            getFeatureProductList(limit: Int, offset: Int): FeatureProductList
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
