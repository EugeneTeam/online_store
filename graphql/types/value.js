const models = require('../../models');
const {PAGINATION} = require('../../config/constants');
const {Op} = require('sequelize');

module.exports = class Value {
    static resolver() {
        return {
            Query: {
                getValueById: async(obj, args) => {
                    return models.Value.smartSearch({options: args.valueId, error: true})
                },
                getValueList: async(obj, args) => {
                    return models.Value.smartSearch({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET
                        },
                        count: true
                    })
                }
            },
            Mutation: {
                createValue: async(obj, args) => {
                    return models.Value.createItem({
                        item: {
                            value: args.value,
                            type: args.type,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [{
                            options: {
                                where: {
                                    value: args.value,
                                    type: args.type
                                }
                            },
                            error: true,
                            message: `Value "${args.value}" is exists`
                        }]
                    })
                },
                updateValue: async(obj, args) => {
                    return models.Value.updateItem({
                        options: args.valueId,
                        updatedItem: {
                            value: args.value,
                            type: args.type,
                            updatedAt: new Date()
                        },
                        dependency: [
                            {options: args.valueId},
                            {
                                options: {
                                    where: {
                                        value: args.value,
                                        type: args.type
                                    }
                                },
                                error: true,
                                message: `Value "${args.value}" and type "${args.type}" is used`
                            }
                        ]
                    })
                },
                removeValue: async(obj, args) => {
                    return models.Value.removeItem({
                        options: args.valueId
                    })
                },
                bulkDeleteValue: async(obj, args) => {
                    return models.Value.destroy({
                        where: {
                            id: {
                                [Op.in]: args.valueIds
                            }
                        }
                    });
                }
            }
        }
    }

    static typeDefs() {
        return `
           type Value { 
                id: Int
                value: String
                type: String
                createdAt: String
                updatedAt: String
           }
           type ValueList {
                count: Int
                rows: [Value]
           }
        `;
    }

    static mutationTypeDefs() {
        return `
            createValue(value: String!, type: String!): Value
            updateValue(valueId: Int!, value: String!, type: String!): Value
            removeValue(valueId: Int!): String
            bulkDeleteValue(valueIds: [Int]!): Int
        `;
    }

    static queryTypeDefs() {
        return `
            getValueById(valueId: Int): Value
            getValueList(limit: Int, offset: Int): ValueList
        `;
    }
}
