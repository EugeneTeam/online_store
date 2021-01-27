const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class Gallery {
    static resolver() {
        return {
            Query: {
                getGalleryById: async (obj, args) => {
                    return models.Gallery.findItem({
                        options: args.galleryId,
                        error: true
                    })
                },
                getGalleryList: async (obj, args) => {
                    return models.Gallery.findItem({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET,
                            include: {model: models.Image}
                        },
                        count: true
                    });
                }
            },
            Gallery: {
              images: gallery => gallery.getImages()
            },
            Mutation: {
                createGallery: async (obj, args) => {
                    return models.Gallery.createItem({
                       item: {
                           name: args.name,
                           createdAt: new Date(),
                           updatedAt: new Date(),
                       },
                        dependency: [{
                            options: {where: {name: args.name}},
                            error: true,
                            message: `Gallery name ${args.name} is used`
                        }]
                    });
                },
                renameGallery: async (obj, args) => {
                    return models.Gallery.updateItem({
                        updatedItem: {
                            name: args.name,
                            updatedAt: new Date()
                        },
                        options: args.galleryId,
                        dependency: [{
                            options: {where: {name: args.name}},
                            error: true,
                            message: `Gallery name ${args.name} is used`
                        }]
                    });
                },
                removeGallery: async (obj, args) => {
                    return models.Gallery.removeItem({
                        options: args.galleryId

                    })
                },
                bulkAddImageToGallery: async (obj, {galleryId, imagesIds}) => {
                    await models.Gallery.findItem({options: galleryId, error: true});
                    await models.sequelize.transaction(async transaction => {
                       for (const imageId of imagesIds) {
                           await models.Image.findItem({options: imageId, error: true});
                           await models.ImageGallery.createItem({
                              item: {galleryId, imageId},
                              transaction,
                              dependency: [{
                                  options: {galleryId, imageId},
                                  error: true,
                                  message: `duplicate entry. galleryId:${galleryId}, imageId:${imageId}`
                              }]
                           });
                       }
                    });
                    return models.Gallery.findItem({
                        options: {
                            where: {id: galleryId},
                            include: {model: models.Image}
                        }
                    })
                },
            }
        }
    }

    static typeDefs() {
        return `
            type Gallery {
                id: Int
                name: String
                createdAt: String
                updatedAt: String
                images: [Image]
            }
            type GalleryList{
                count: Int,
                rows: [Gallery]
            }
            type GalleryAndImages {
                id: Int
                name: String
                createdAt: String
                updatedAt: String
                Images: [Image]
            }
        `;
    }

    static mutationTypeDefs() {
        return `
            createGallery(name: String!): Gallery
            renameGallery(galleryId: Int!, name: String!): Gallery
            removeGallery(galleryId: Int!): String
            bulkAddImageToGallery(imagesIds: [Int]!, galleryId: Int!): GalleryAndImages
        `;
    }

    static queryTypeDefs() {
        return `
            getGalleryById(galleryId: Int!): Gallery
            getGalleryList(limit: Int, offset: Int): GalleryList
        `;
    }
}
