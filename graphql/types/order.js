const {PAGINATION} = require('../../config/constants');
const models = require('../../models');
const {ApolloError} = require('apollo-server');

module.exports = class Order {
    static resolver() {
        return {
            Query: {
                getOrderById: async (obj, args) => {
                    return models.Order.smartSearch({
                        options: args.orderId
                    });
                },
                getOrderList: async (obj, args, {user}) => {
                    return models.Order.smartSearch({
                        options: {
                            where: {
                                userId: user.isCustomer ? user.id : args.userId,
                                ...(args.status ? {status: args.status} : null)
                            },
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET
                        },
                        returnsCountAndList: true
                    });
                },
            },
            Order: {
                part: order => order.getOrderParts(),
                user: order => order.getUser(),
                deliveryType: order => order.getDeliveryType(),
                paymentType: order => order.getPaymentType(),
            },
            Mutation: {
                updateOrder: async (obj, {orderInput, orderId}) => {
                    return await models.sequelize.transaction(async transaction => {
                        const order = await models.Order.smartSearch({
                            options: orderId
                        });
                        await order.update({
                            ...(orderInput.deliveryTypeId ? {deliveryTypeId: orderInput.deliveryTypeId} : null),
                            ...(orderInput.paymentTypeId ? {paymentTypeId: orderInput.paymentTypeId} : null),
                            ...(orderInput.status ? {status: orderInput.status} : null)
                        });

                        const partsOrder = await models.OrderOrderPart.smartSearch({
                            options: {orderId},
                            returnsItemsList: true
                        });

                        if (orderInput.partsOrder && orderInput.partsOrder.length) {
                            for (const partId of orderInput.partsOrder) {

                                const index = partsOrder.findIndex(item => item.orderPartId === partId);

                                if (index === -1) {
                                    await models.OrderOrderPart.createItem({
                                        item: {
                                            orderId,
                                            orderPartId: partId
                                        },
                                        dependency: [
                                            {
                                                options: partId,
                                                tableName: 'OrderPart',
                                                errorIfElementDoesNotExist: true
                                            }
                                        ],
                                        transaction
                                    });
                                } else {
                                    partsOrder.splice(index, 1);
                                }
                            }

                            if (partsOrder.length) {
                                for (const part of partsOrder) {
                                    await part.destroy({transaction});
                                    await models.OrderPart.destroy({
                                        transaction,
                                        where: {
                                            id: part.orderPartId
                                        }
                                    });
                                }
                            }
                        }
                        return order;
                    });
                },
                removeOrder: async (obj, {orderId}) => {
                    return models.Order.removeItem({
                        options: orderId
                    });
                },
                createOrder: async (obj, {orderInput}, {user}) => {
                    return await models.sequelize.transaction(async transaction => {
                        const order = await models.Order.createItem({
                            transaction,
                            item: {
                                userId: user.id,
                                address: user.address,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                middleName: user.middleName,
                                phone: user.phone,
                                paymentTypeId: orderInput.paymentTypeId,
                                deliveryTypeId: orderInput.deliveryTypeId,
                                status: 'NEW',
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            },
                            dependency: [
                                {
                                    options: orderInput.deliveryTypeId,
                                    tableName: 'DeliveryType',
                                    errorIfElementDoesNotExist: true
                                },
                                {
                                    options: {
                                        where: {
                                            id: orderInput.deliveryTypeId,
                                            status: 'INACTIVE'
                                        }
                                    },
                                    tableName: 'DeliveryType',
                                    errorIfElementExists: true,
                                    customErrorMessage: 'This type of delivery is disabled'
                                },
                                {
                                    options: orderInput.paymentTypeId,
                                    tableName: 'PaymentType',
                                    errorIfElementDoesNotExist: true
                                },
                                {
                                    options: {
                                        where: {
                                            id: orderInput.paymentTypeId,
                                            status: 'INACTIVE'
                                        }
                                    },
                                    tableName: 'PaymentType',
                                    errorIfElementExists: true,
                                    customErrorMessage: 'This type of payment is disabled'
                                },
                            ]
                        });

                        if (orderInput.partsOrder.length) {
                            for (const orderPartId of orderInput.partsOrder) {
                                await models.OrderOrderPart.createItem({
                                    transaction,
                                    item: {
                                        orderId: order.id,
                                        orderPartId
                                    },
                                    dependency: [{
                                        options: orderPartId,
                                        tableName: 'OrderPart',
                                        errorIfElementDoesNotExist: true,
                                        customErrorMessage: `OrderPart not found. id:${orderPartId}`
                                    }]
                                });
                            }
                        }
                        return order;
                    });
                },
            }
        };
    }

    static typeDefs() {
        return `
            type Order {
                id: Int
                status: String
                user: User
                deliveryType: DeliveryType
                paymentType: PaymentType
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
                deliveryTypeId: Int!
                paymentTypeId: Int!
                partsOrder: [Int]!
            }
            input OrderUpdate {
                deliveryTypeId: Int
                paymentTypeId: Int
                partsOrder: [Int]
                status: String
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
            updateOrder(orderInput: OrderUpdate!, orderId: Int!): Order
            createOrder(orderInput: OrderInput!): Order
            removeOrder(orderId: Int): String
        `;
    }
}
