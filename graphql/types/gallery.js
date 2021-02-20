const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class Gallery {
    static resolver() {
        return {
            Query: {
                getGalleryById: async (obj, args) => {
                    return models.Gallery.smartSearch({
                        options: args.galleryId
                    });
                },
                getGalleryList: async (obj, args) => {
                    return models.Gallery.smartSearch({
                        options: {
                            limit: args.limit || PAGINATION.DEFAULT_LIMIT,
                            offset: args.offset || PAGINATION.DEFAULT_OFFSET,
                            include: {model: models.Image}
                        },
                        returnsCountAndList: true
                    });
                }
            },
            Gallery: {
              images: gallery => gallery.getImages({
                  order: [
                      ['order', 'ASC']
                  ]
              })
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
                            errorIfElementExists: true,
                            customErrorMessage: `Gallery name ${args.name} is used`
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
                            errorIfElementExists: true,
                            customErrorMessage: `Gallery name ${args.name} is used`
                        }]
                    });
                },
                removeGallery: async (obj, args) => {
                    return models.Gallery.removeItem({
                        options: args.galleryId
                    });
                },
                bulkAddImageToGallery: async (obj, {galleryId, imagesIds}) => {
                    await models.Gallery.smartSearch({
                        options: galleryId
                    });
                    await models.sequelize.transaction(async transaction => {
                       for (const imageId of imagesIds) {
                           await models.Image.smartSearch({options: imageId, errorIfElementDoesNotExist: true});
                           await models.ImageGallery.createItem({
                               transaction,
                               item: {galleryId, imageId},
                               dependency: [{
                                  options: {where: {galleryId, imageId}},
                                  errorIfElementExists: true,
                                  customErrorMessage: `duplicate entry. galleryId:${galleryId}, imageId:${imageId}`
                              }]
                           });
                       }
                    });
                    return models.Gallery.smartSearch({
                        options: {
                            where: {id: galleryId},
                            include: {model: models.Image}
                        }
                    });
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
                images: [Image]
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
