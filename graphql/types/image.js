const models = require('../../models');
const {PAGINATION} = require('../../config/constants');

module.exports = class Image {
    static resolver() {
        return {
            Query: {
                // getImageById: async(obj, args) => {},
                // getImageList: async(obj, args) => {}
            },
            Mutation: {
                // createImage: async(obj, args) => {},
                // updateImage: async(obj, args) => {},
                // removeImage: async(obj, args) => {},
                // bulkDeleteImage: async(obj, args) => {},
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
        `;
    }

    static mutationTypeDefs() {
        return `
        `;
    }

    static queryTypeDefs() {
        return `
        `;
    }
}
