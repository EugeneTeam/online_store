const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class DeliveryType {
    static resolver() {
        return {
            Query: {
                getPaymentTypeById: async (obj, args) => {
                    return models.PaymentType.smartSearch({
                        options: args.paymentTypeId
                    });
                },
                getPaymentTypeList: async (obj, args) => {
                    return models.PaymentType.smartSearch({
                        options: {
                            ...(args.limit ? {limit: args.limit || PAGINATION.DEFAULT_LIMIT} : null),
                            ...(args.offset ? {offset: args.offset || PAGINATION.DEFAULT_OFFSET} : null),
                        },
                        returnsCountAndList: true
                    });
                }
            },
            Mutation: {
                createPaymentType: async (obj, args) => {
                    return models.PaymentType.createItem({
                        item: {
                            status: args.status,
                            name: args.name,
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
                updatePaymentType: async (obj, args) => {
                    return models.PaymentType.updateItem({
                        options: args.paymentTypeId,
                        updatedItem: {
                            ...(args.name ? {name: args.name} : null),
                            status: args.status,
                            updatedAt: new Date()
                        },
                        dependency: args.name ? [{
                            options: {
                                where: {
                                    name: args.name,
                                    status: args.status
                                }
                            },
                            errorIfElementExists: true,
                            customErrorMessage: `PaymentType is exists`
                        }] : []
                    });
                },
                removePaymentType: async (obj, args) => {
                    return models.PaymentType.removeItem({
                        options: args.paymentTypeId
                    });
                }
            }
        };
    }

    static typeDefs() {
        return `
            type PaymentType {
                id: Int
                status: String
                name: String
                createdAt: String
                updatedAt: String
            }
            
            type PaymentTypeList {
                count: Int
                rows: [PaymentType]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getPaymentTypeById(paymentTypeId: Int): PaymentType
            getPaymentTypeList(limit: Int, offset: Int): PaymentTypeList
        `;
    }

    static mutationTypeDefs() {
        return `
            createPaymentType(name: String!, status: String!): PaymentType
            updatePaymentType(name: String, status: String!, paymentTypeId: Int!): PaymentType
            removePaymentType(paymentTypeId: Int!): String
        `;
    }
}
