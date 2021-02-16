const models = require('../../models');
const {PAGINATION} = require('../../config/constants');
const {ApolloError} = require('apollo-server');

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
                    return models.Comment.smartSearch({
                        options: {
                            ...(args.limit ? {limit: args.limit || PAGINATION.DEFAULT_LIMIT} : null),
                            ...(args.offset ? {offset: args.offset || PAGINATION.DEFAULT_OFFSET} : null)
                        },
                        count: true
                    });
                }
            },
            Comment: {
                user: comment => comment.getUser(),
                replyToComment: comment => models.Comment.getChildList(comment.id)
            },
            Mutation: {
                createComment: async (obj, {createComment}, {user}) => {
                    if (createComment.rating > 5 || createComment.rating < 0) {
                        throw new ApolloError('valid value for rating is from 0 to 5', '400');
                    }
                    return models.Comment.createItem({
                        item: {
                            userId: user.id,
                            productId: createComment.productId || null,
                            limitations: createComment.limitations || null,
                            dignity: createComment.dignity || null,
                            text: createComment.text,
                            rating: createComment.rating,
                            parentId: createComment.parentId || null,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }
                    })
                },
                replyToComment: async (obj, {replyComment}, {user}) => {
                    return models.Comment.createItem({
                        item: {
                            userId: user.id,
                            productId: replyComment.productId,
                            limitations: null,
                            dignity: null,
                            text: replyComment.text,
                            rating: 0,
                            parentId: replyComment.parentId,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        dependency: [
                            {options: replyComment.parentId}
                        ]
                    })
                },
                removeComment: async (obj, {commentId}) => {
                    return models.Comment.removeItem({options: commentId})
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
            }
            input ReplyCommentInput {
                productId: Int
                text: String!
                parentId: Int!
            }
            type CommentList {
                count: Int
                rows: [Comment]
            }
        `;
    }

    static queryTypeDefs() {
        return `
            getCommentList(limit: Int, offset: Int): CommentList
            getReplyComments(commentId: Int!): [Comment]
        `;
    }

    static mutationTypeDefs() {
        return `
            createComment(createComment: CreateCommentInput): Comment
            replyToComment(replyComment: ReplyCommentInput): Comment
            removeComment(commentId: Int!): String
        `;
    }
}
