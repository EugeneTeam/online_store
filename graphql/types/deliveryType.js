const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class DeliveryType {
    static resolver() {
        return {
            Query: {
                getDeliveryTypeById: async (obj, args) => {
                    return models.DeliveryType.smartSearch({
                        options: args.deliveryTypeId
                    });
                },
                getDeliveryTypeList: async (obj, args) => {
                    return models.DeliveryType.smartSearch({
                        options: {
                            ...(args.limit ? {limit: args.limit || PAGINATION.DEFAULT_LIMIT} : null),
                            ...(args.offset ? {offset: args.offset || PAGINATION.DEFAULT_OFFSET} : null),
                        },
                        returnsCountAndList: true
                    });
                }
            },
            Mutation: {
                createDeliveryType: async (obj, args) => {
                    return models.DeliveryType.createItem({
                        item: {
                            status: args.status,
                            name: args.name,
                            price: args.price,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [
                            {
                                options: {where: {name: args.name}},
                                errorIfElementExists: true,
                                customErrorMessage: `${args.name} is exists`
                            }
                        ]
                    });
                },
                updateDeliveryType: async (obj, args) => {
                    return models.DeliveryType.updateItem({
                        options: args.deliveryTypeId,
                        updatedItem: {
                            ...(args.name ? {name: args.name} : null),
                            ...(args.price ? {price: args.price} : null),
                            status: args.status,
                            updatedAt: new Date()
                        },
                        dependency: args.name ? [{
                            options: {where: {name: args.name}},
                            errorIfElementExists: true,
                            customErrorMessage: `${args.name} is exists`
                        }] : []
                    });
                },
                removeDeliveryType: async (obj, args) => {
                    return models.DeliveryType.removeItem({
                        options: args.deliveryTypeId
                    });
                }
            }
        };
    }

    static typeDefs() {
        return `
            type DeliveryType {
                id: Int
                status: String
                name: String
                price: Float
                createdAt: String
                updatedAt: String
            }
            
            type DeliveryTypeList {
                count: Int
                rows: [DeliveryType]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getDeliveryTypeById(deliveryTypeId: Int): DeliveryType
            getDeliveryTypeList(limit: Int, offset: Int): DeliveryTypeList
        `;
    }

    static mutationTypeDefs() {
        return `
            createDeliveryType(price: Float!, name: String!, status: String!): DeliveryType
            updateDeliveryType(price: Float, name: String, status: String!, deliveryTypeId: Int!): DeliveryType
            removeDeliveryType(deliveryTypeId: Int!): String
        `;
    }
}
