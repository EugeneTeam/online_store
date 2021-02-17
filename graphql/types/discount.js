const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class Discount {

    static resolver() {
        return  {
            Query: {
                getDiscountById: async (obj, args) => {
                    return models.Discount.smartSearch({
                        options: args.discountId
                    });
                },
                getDiscountList: async (obj, args) => {
                    return models.Discount.smartSearch({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET,
                        },
                        returnsCountAndList: true
                    });
                }
            },
            Mutation: {
                createDiscount: async (obj, args) => {
                    return models.Discount.createItem({
                        item: {
                            type: args.type,
                            discount: args.discount,
                            expiredAt: args.expiredAt,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        dependency: [
                            {
                                options: {
                                    where: {
                                        type: args.type,
                                        discount: args.discount,
                                        expiredAt: args.expiredAt,
                                    }
                                },
                                errorIfElementExists: true
                            }
                        ]
                    });
                },
                updateDiscount: async (obj, args) => {
                    return models.Discount.updateItem({
                        options: args.discountId,
                        updatedItem: {
                            type: args.type,
                            discount: args.discount,
                            expiredAt: args.expiredAt,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        dependency: [
                            {
                                options: {
                                    where: {
                                        type: args.type,
                                        discount: args.discount,
                                        expiredAt: args.expiredAt,
                                    }
                                },
                                errorIfElementExists: true
                            }
                        ]
                    });
                },
                removeDiscount: async (obj, args) => {
                    return models.Discount.removeItem({
                        options: args.discountId
                    });
                }
            }
        }
    }

    static typeDefs() {
        return `
            type Discount {
                id: Int
                type: String
                discount: Float
                expiredAt: String
                createdAt: String
                updatedAt: String
            }
            type DiscountList {
                count: Int
                rows: [Discount]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getDiscountById(discountId: Int!): Discount
            getDiscountList(limit: Int, offset: Int): DiscountList
        `;
    }

    static mutationTypeDefs() {
        return `
            createDiscount(type: String!, discount: Float!, expiredAt: String!): Discount
            updateDiscount(discountId: Int!, type: String, discount: Float, expiredAt: String): Discount
            removeDiscount(discountId: Int!): String
        `;
    }
}
