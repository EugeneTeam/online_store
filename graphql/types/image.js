const models = require('../../models');
const {PAGINATION} = require('../../config/constants');
const {Op} = require('sequelize');

module.exports = class Image {
    static resolver() {
        return {
            Query: {
                getImageById: async(obj, args) => {
                    return models.Image.findItem({options: args.imageId})
                },
                getImageList: async(obj, args) => {
                    return models.Image.findItem({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET
                        },
                        count: true
                    })
                }
            },
            Mutation: {
                createImage: async(obj, args) => {
                    return models.Image.createItem({
                        item: {
                            url: args.url,
                            title: args.title || null,
                            alt: args.alt || null,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        dependency: [{
                            options: {
                                where: {
                                    url: args.url,
                                }
                            },
                            error: true,
                            message: `"${args.url}" is used`
                        }]
                    })
                },
                updateImage: async(obj, args) => {
                    return models.Image.updateItem({
                        options: args.imageId,
                        updatedItem: {
                            url: args.url,
                            title: args.title || null,
                            alt: args.alt || null,
                        },
                        dependency: [{
                            options: {
                                where: {
                                    url: args.url,
                                }
                            },
                            error: true,
                            message: `"${args.url}" is used`
                        }]
                    })
                },
                removeImage: async(obj, args) => {
                    return models.Image.removeItem({
                        options: args.imageId
                    })
                },
                bulkDeleteImage: async(obj, args) => {
                    return models.Image.destroy({
                        where: {
                            id: {
                                [Op.in]: args.imageIds
                            }
                        }
                    });
                }
            }
        }
    }

    static typeDefs() {
        return `
           type Image {
                id: Int
                url: String
                title: String
                alt: String
                createdAt: String
                updatedAt: String
           }
           type ImageList {
                count: Int
                rows: [Image]
           }
        `;
    }

    static mutationTypeDefs() {
        return `
            createImage(url: String!, title: String, alt: String): Image
            updateImage(imageId: Int!, url: String!, title: String, alt: String): Image
            removeImage(imageId: Int!): String
            bulkDeleteImage(imageIds: [Int]!): Int
        `;
    }

    static queryTypeDefs() {
        return `
            getImageById(imageId: Int!): Image
            getImageList(limit: Int, offset: Int): ImageList
        `;
    }
}
