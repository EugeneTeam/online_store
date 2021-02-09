const models = require('../../models');

module.exports = class ImageGallery {
    static resolver() {
        return {
            Mutation: {
                addImageForGallery: async (obj, args) => {
                    await models.ImageGallery.createItem({
                        item: {
                            imageId: args.imageId,
                            galleryId: args.galleryId,
                        },
                        dependency: [
                            {options: args.galleryId, table: 'Gallery'},
                            {options: args.imageId, table: 'Image'},
                            {
                            options: {
                                where: {
                                    imageId: args.imageId,
                                    galleryId: args.galleryId,
                                }
                            },
                            error: true,
                            message: 'Image added to this gallery'
                        }, ]
                    });
                    return models.Gallery.smartSearch({options: args.galleryId})
                },
                addImagesForGallery: async (obj, args) => {
                    if (args.imageIds.length) {
                        await models.sequelize.transaction(async transaction => {
                            for (const id of args.imageIds) {
                                await models.ImageGallery.createItem({
                                    item: {
                                        imageId: id,
                                        galleryId: args.galleryId,
                                    },
                                    transaction,
                                    dependency: [
                                        {options: args.galleryId, table: 'Gallery'},
                                        {options: id, table: 'Image'},
                                        {
                                        options: {
                                            where: {
                                                imageId: id,
                                                galleryId: args.galleryId,
                                            }
                                        },
                                        error: true,
                                        message: `Image (Id:${id}) added to this gallery`
                                    }]
                                })
                            }
                        })
                    }
                    return models.Gallery.smartSearch({options: args.galleryId})
                }
            }
        };
    }
    static mutationTypeDefs() {
        return `
            addImageForGallery(galleryId: Int!, imageId: Int!): Gallery
            addImagesForGallery(galleryId: Int!, imageIds: [Int]!): Gallery
        `;
    }
}
