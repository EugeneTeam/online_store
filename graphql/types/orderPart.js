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
                        count: true
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
                            userId: user.id
                        }
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
            createOrderPart(productId: Int!, quantity: Int): OrderPart
        `;
    }
}
