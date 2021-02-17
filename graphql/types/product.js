const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class Product {
    static resolver() {
        return {
            Query: {
                getProductById: async(obj, args) => {
                    return models.Product.smartSearch({
                        options: args.productId
                    });
                },
                getProductList: async(obj, args) => {
                    return models.Category.smartSearch({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET
                        },
                        returnsCountAndList: true
                    });
                },
                getProductListByFilter: async (obj, args) => {
                    return models.Product.getProductByFilter(args);
                }
            },
            Product: {
                featureProduct: product => product.getFeatureProducts(),
                category: product => product.getCategory(),
                gallery: product => product.getGallery(),
                comments: product => product.getComments(),
                discount: product => product.getDiscount()
            },
            Mutation: {
                createProduct: async (obj, args) => {
                    const dependency = [
                        {
                            options: {
                                where: {
                                    name: args.name
                                }
                            },
                            errorIfElementExists: true
                        },
                        {
                            options: args.categoryId,
                            tableName: 'Category',
                            errorIfElementDoesNotExist: true
                        },
                        {
                            options: args.galleryId,
                            tableName: 'Gallery',
                            errorIfElementDoesNotExist: true
                        },
                    ]
                    if (args.discountId) {
                        dependency.push({
                            options: args.discountId,
                            tableName: 'Discount',
                            errorIfElementDoesNotExist: true
                        });
                    }
                    return models.Product.createItem({
                        item: {
                            name: args.name,
                            categoryId: args.categoryId,
                            description: args.description,
                            price: args.price,
                            discountId: args.discountId || null,
                            galleryId: args.galleryId,
                            rating: 5,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        dependency
                    });
                },
                updateProduct: async (obj, args) => {
                    const dependency = []
                    if (args.name) {
                        dependency.push({
                            options: {
                                where: {
                                    name: args.name
                                }
                            },
                            errorIfElementExists: true,
                            customErrorMessage: `Name "${args.name}" is used`
                        });
                    }
                    if (args.discountId) {
                        dependency.push({
                            options: args.discountId,
                            tableName: 'Discount',
                            errorIfElementDoesNotExist: true
                        });
                    }
                    if (args.categoryId) {
                        dependency.push({
                            options: args.categoryId,
                            tableName: 'Category',
                            errorIfElementDoesNotExist: true
                        });
                    }
                    if (args.galleryId) {
                        dependency.push({
                            options: args.galleryId,
                            tableName: 'Gallery',
                            errorIfElementDoesNotExist: true
                        });
                    }
                    return models.Product.updateItem({
                        options: args.productId,
                        updatedItem: {
                            name: args.name,
                            categoryId: args.categoryId,
                            description: args.description,
                            price: args.price,
                            discountId: args.discountId,
                            galleryId: args.galleryId,
                            updatedAt: new Date(),
                        },
                        dependency
                    });
                },
                removeProduct: async (obj, args) => {
                    return models.Product.removeItem({
                        options: args.productId
                    });
                }
            },
        }
    }

    static typeDefs() {
        return `
           type Product { 
                id: Int
                name: String
                description: String
                price: Float
                rating: Float
                createdAt: String
                updatedAt: String
                discount: [Discount]
                gallery: Gallery
                category: Category
                comments: [Comment]
                featureProduct: [FeatureProduct]
           }
           
           type ProductList {
                count: Int
                rows: [Product]
           }
        `;
    }

    static mutationTypeDefs() {
        return `
            removeProduct(productId: Int!): String
            updateProduct(productId: Int!, name: String, categoryId: Int, description: String, price: Float, discountId: Int, galleryId: Int): Product
            createProduct(name: String!, categoryId: Int!, description: String!, price: Float!, discountId: Int, galleryId: Int!): Product
        `;
    }

    static queryTypeDefs() {
        return `
            getProductListByFilter(priceOrder: String, priceFrom: Float, priceTo: Float, name: String, isHaveDiscount: Boolean, categoryId: Int, limit: Int, offset: Int, characteristicId: Int, valueId: Int, ids: [Int]): ProductList
            getProductById(productId: Int): Product
            getProductList(limit: Int, offset: Int): ProductList
        `;
    }
}
