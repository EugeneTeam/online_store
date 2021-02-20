const models = require('../../models');
const {PAGINATION} = require('../../config/constants');
const {ApolloError} = require('apollo-server');
const {Op} = require('sequelize');

module.exports = class Comment {
    static resolver() {
        return {
            Query: {
                getReplyComments: async (obj, args) => {
                    if (!args.commentId) {
                        throw new ApolloError('commentId is required', '400');
                    }
                    return models.Comment.getChildList(args.commentId);
                },
                getCommentList: async (obj, args) => {
                    let rating = {
                        [Op.and]: [
                            {
                                rating: {
                                    [Op.gte]: args.ratingFrom || 0
                                }
                            },
                            {
                                rating: {
                                    [Op.lte]: args.ratingTo || 1000
                                }
                            }
                        ]
                    };

                    return models.Comment.smartSearch({
                        options: {
                            ...(args.limit ? {limit: args.limit || PAGINATION.DEFAULT_LIMIT} : null),
                            ...(args.offset ? {offset: args.offset || PAGINATION.DEFAULT_OFFSET} : null),
                            where: {
                                ...(args.productId ? {productId: args.productId} : null),
                                ...(args.userId ? {userId: args.userId} : null),
                                ...(args.ratingFrom || args.ratingTo ? rating : null)
                            },
                            ...(args.sortByRating ? {order: [['rating', args.sortByRating]]} : null)
                        },
                        returnsCountAndList: true
                    });
                }
            },
            Comment: {
                user: comment => comment.getUser(),
                replyToComment: comment => models.Comment.getChildList(comment.id)
            },
            Mutation: {
                createComment: async (obj, {createCommentInput}, {user}) => {
                    if (createCommentInput.rating > 5 || createCommentInput.rating < 0 && !createCommentInput.parentId) {
                        throw new ApolloError('valid value for rating is from 0 to 5', '400');
                    }
                    return models.Comment.createItem({
                        item: {
                            userId: user.id,
                            productId: createCommentInput.productId || null,
                            limitations: createCommentInput.parentId ? null : (createCommentInput.limitations || null) ,
                            dignity: createCommentInput.parentId ? null : (createCommentInput.dignity || null) ,
                            text: createCommentInput.text,
                            rating: createCommentInput.parentId ? null : (createCommentInput.rating),
                            parentId: createCommentInput.parentId || null,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }
                    });
                },
                removeComment: async (obj, {commentId}) => {
                    return models.Comment.removeItem({options: commentId});
                },
            }
        };
    }

    static typeDefs() {
        return `
            type Comment {
                id: Int
                user: User
                limitations: String
                dignity: String
                text: String
                rating: Float
                replyToComment: [Comment]
                createdAt: String
                updatedAt: String
            }
            input CreateCommentInput {
                productId: Int!
                limitations: String
                dignity: String
                text: String!
                rating: Float!
                parentId: Int
            }
            type CommentList {
                count: Int
                rows: [Comment]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getCommentList(limit: Int, offset: Int,productId: Int, userId: Int, ratingFrom: Float, ratingTo: Float, sortByRating: String): CommentList
            getReplyComments(commentId: Int!): [Comment]
        `;
    }

    static mutationTypeDefs() {
        return `
            createComment(createCommentInput: CreateCommentInput): Comment
            removeComment(commentId: Int!): String
        `;
    }
}
