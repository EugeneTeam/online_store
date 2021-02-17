const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class OrderPart {
    static resolver() {
        return {
            Query: {
                getOrderPartsListByUserId: async (obj, args) => {
                    return models.OrderPart.smartSearch({
                        options: {
                            ...(args.limit ? {limit: args.limit || PAGINATION.DEFAULT_LIMIT} : null),
                            ...(args.offset ? {offset: args.offset || PAGINATION.DEFAULT_OFFSET} : null),
                        },
                        returnsCountAndList: true
                    });
                },
            },
            OrderPart: {
                product: orderPart => orderPart.getProduct()
            },
            Mutation: {
                createOrderPart: async (obj, args, {user}) => {
                    return models.OrderPart.createItem({
                        item: {
                            productId: args.productId,
                            quantity: args.quantity || 1,
                            userId: !user.isCustomer && user.id ? args.userId : user.id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        dependency: [
                            {
                                options: {
                                    where: {
                                        productId: args.productId,
                                        userId: user.id,
                                    }
                                },
                                errorIfElementExists: true,
                                customErrorMessage: 'The product has already been added to the cart'
                            }
                        ]
                    });
                },
                updateOrderPart: async (obj, args) => {
                    return models.OrderPart.updateItem({
                        options: args.orderPartId,
                        updatedItem: {
                            quantity: args.quantity,
                        },
                        dependency: [{
                            options: args.orderPartId,
                            errorIfElementDoesNotExist: true
                        }]
                    });
                },
                removeOrderPart: async (obj, args) => {
                    return models.OrderPart.removeItem({
                        options: args.orderPartId
                    });
                }
            }
        }
    }
    static typeDefs() {
        return `
            type OrderPart {
                id: Int
                product: Product
                quantity: Int
                createdAt: String
                updatedAt: String
            }
            input OrderPartInput {
                productId: Int!
                quantity: Int!
            }
            type OrderPartList {
                count: Int
                rows: [OrderPart]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getOrderPartsListByUserId(limit: Int, offset: Int): OrderPartList
        `;
    }

    static mutationTypeDefs() {
        return `
            updateOrderPart(orderPartId: Int!, quantity: Int!): OrderPart
            removeOrderPart(orderPartId: Int!): String
            createOrderPart(productId: Int!, quantity: Int, userId: Int): OrderPart
        `;
    }
}
