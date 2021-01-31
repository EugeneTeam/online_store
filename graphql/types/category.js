const models = require('../../models');
const {PAGINATION} = require('../../config/constants');
const {Op} = require('sequelize');

module.exports = class Category {
    static resolver() {
        return {
            Query: {
                getCategoryById: async(obj, args) => {
                    return models.Category.findItem({options: args.categoryId, error: true})
                },
                getCategoryList: async(obj, args) => {
                    return models.Category.findItem({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET
                        },
                        count: true
                    })
                }
            },
            Category: {
                characteristics: category => category.getCharacteristics(),
            },
            Mutation: {
                createCategory: async(obj, args) => {
                    return models.Category.createItem({
                        item: {
                            name: args.name,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [{
                            options: {
                                where: {name: args.name}
                            },
                            error: true,
                            message: `Category "${args.name}" is exists`
                        }]
                    })
                },
                updateCategory: async(obj, args) => {
                    return models.Category.updateItem({
                        options: args.categoryId,
                        updatedItem: {
                            name: args.name,
                            updatedAt: new Date()
                        },
                        dependency: [
                            {options: args.categoryId},
                            {
                                options: {
                                    where: {name: args.name}
                                },
                                error: true,
                                message: `"${args.name}" is used`
                            }
                        ]
                    })
                },
                removeCategory: async(obj, args) => {
                    return models.Category.removeItem({
                        options: args.categoryId
                    })
                },
                bulkDeleteCategory: async(obj, args) => {
                    return models.Category.destroy({
                        where: {
                            id: {
                                [Op.in]: args.categoryIds
                            }
                        }
                    });
                }
            }
        }
    }

    static typeDefs() {
        return `
           type Category { 
                id: Int
                name: String
                createdAt: String
                updatedAt: String
                characteristics: [Characteristic]
           }
           
           type CategoryList {
                count: Int
                rows: [Category]
           }
        `;
    }

    static mutationTypeDefs() {
        return `
            createCategory(name: String!): Category
            updateCategory(categoryId: Int!, name: String!): Category
            removeCategory(categoryId: Int!): String
            bulkDeleteCategory(categoryIds: [Int]!): Int
        `;
    }

    static queryTypeDefs() {
        return `
            getCategoryById(categoryId: Int): Category
            getCategoryList(limit: Int, offset: Int): CategoryList
        `;
    }
}
