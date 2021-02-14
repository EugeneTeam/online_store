const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class Bookmark {
    static resolver() {
        return {
            Query: {
                getBookmarkListByUserId: async (obj, args, context) => {
                    return models.Bookmark.smartSearch({
                        options: {
                            ...(args.limit ? {limit: args.limit || PAGINATION.DEFAULT_LIMIT} : null),
                            ...(args.offset ? {offset: args.offset || PAGINATION.DEFAULT_OFFSET} : null),
                        },
                        count: true
                    })
                },
            },
            Bookmark: {
              user: bookmark => bookmark.getUser(),
              product: bookmark => bookmark.getProduct()
            },
            Mutation: {
                createBookmark: async (obj, args, context) => {
                    return models.Bookmark.createItem({
                        item: {
                            userId: context.user.id,
                            productId: args.productId,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        dependency: [
                            {options: args.productId, table: 'Product'},
                            {
                                options: {
                                    where: {
                                        userId: context.user.id,
                                        productId: args.productId,
                                    }
                                },
                                error: true
                            }
                        ]
                    })
                },
                removeBookmark: async (obj, args, context) => {
                    return models.Bookmark.removeItem({
                        options: {
                            where: {
                                userId: context.user.id,
                                productId: args.productId,
                            }
                        }
                    })
                }
            }
        };
    }

    static typeDefs() {
        return `
            type Bookmark {
                id: Int
                user: User
                product: Product
                createdAt: String
                updatedAt: String
            }
            type BookmarkList {
                count: Int
                rows: [Bookmark]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getBookmarkListByUserId(limit: Int, offset: Int): BookmarkList
        `;
    }

    static mutationTypeDefs() {
        return `
            createBookmark(productId: Int!): Bookmark
            removeBookmark(productId: Int!): String
        `;
    }
}
