const {PAGINATION} = require('../../config/constants');
const models = require('../../models');
const {ApolloError} = require('apollo-server');

module.exports = class Order {
    static resolver() {
        return {
            Query: {
                getOrderById: async (obj, args) => {
                    return models.Order.smartSearch({options: args.orderId, error: true});
                },
                getOrderList: async (obj, args, {user}) => {
                    return models.Order.smartSearch({
                        options: {
                            where: {
                                userId: user.isCustomer ? user.id : args.userId,
                                // filter by status
                                ...(args.status ? {status: args.status} : null)
                            },
                            ...(args.limit ? {limit: args.limit || PAGINATION.DEFAULT_LIMIT} : null),
                            ...(args.offset ? {offset: args.offset || PAGINATION.DEFAULT_OFFSET} : null),
                        },
                        count: true
                    })
                },
            },
            Order: {
              part: order => order.getOrderParts(),
            },
            Mutation: {
                createOrder: async (obj, {orderInput, orderPartInput}, {user}) => {
                    if (!user.isCustomer && !orderInput.userId) {
                        throw new ApolloError('userId is require', '400');
                    }
                    return await models.sequelize.transaction(async transaction => {
                        const order = await models.Order.createItem({
                            transaction,
                            item: {
                                userId: user.isCustomer ? user.id : orderInput.userId,
                                address: orderInput.address,
                                firstName: orderInput.firstName,
                                lastName: orderInput.lastName,
                                middleName: orderInput.middleName,
                                phone: orderInput.phone,
                                deliveryTypeId: orderInput.deliveryTypeId,
                                status: 'NEW',
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            },
                            dependency: [
                                {options: user.isCustomer ? user.id : orderInput.userId, table: 'User'},
                                {options: orderInput.deliveryTypeId, table: 'DeliveryType'},
                                {
                                    options: {
                                        where: {
                                            id: orderInput.deliveryTypeId,
                                            status: 'INACTIVE'
                                        }
                                    },
                                    table: 'DeliveryType',
                                    error: true,
                                    message: 'This type of delivery is disabled'
                                },
                            ]
                        });

                        if (orderPartInput && orderPartInput.length) {
                            for (const orderPart of orderPartInput) {
                                const newOrderPart = await models.OrderPart.createItem({
                                    transaction,
                                    item: {
                                        productId: orderPart.productId,
                                        quantity: orderPart.quantity,
                                        createdAt: new Date(),
                                        updatedAt: new Date(),
                                    },
                                    dependency: [{options: orderPart.productId, table: 'Product'}]
                                });
                                await models.OrderOrderPart.createItem({
                                    transaction,
                                    item: {
                                        orderId: order.id,
                                        orderPartId: newOrderPart.id
                                    },
                                })
                            }
                        }
                        return order;
                    })
                },
            }
        };
    }

    static typeDefs() {
        return `
            type Order {
                id: Int
                status: String
                userId: Int
                deliveryTypeId: Int
                address: String
                firstName: String
                lastName: String
                middleName: String
                phone: String
                createdAt: String
                updatedAt: String
                part: [OrderPart]
            }
            type OrderList {
                count: Int
                rows: [Order]
            }
            input OrderInput {
                userId: Int
                deliveryTypeId: Int!
                address: String!
                firstName: String!
                lastName: String!
                middleName: String
                phone: String!
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getOrderById(orderId: Int!): Order
            getOrderList(limit: Int, offset: Int, status: String): OrderList
        `;
    }

    static mutationTypeDefs() {
        return `
            createOrder(orderInput: OrderInput, orderPartInput: [OrderPartInput]): Order
        `;
    }
}
