'use strict';
const _ = require('lodash');
const {gql} = require("apollo-server");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const resolvers = [];
const typeDefs = [];
const mutationTypeDefs = [];
const queryTypeDefs = [];

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const module = require(path.join(__dirname, file));
        resolvers.push(module.resolver());
        typeDefs.push(module.typeDefs())
        mutationTypeDefs.push(module.mutationTypeDefs())
        queryTypeDefs.push(module.queryTypeDefs())
    });

module.exports = {
    resolvers: _.merge(...resolvers),
    typeDefs: gql(`
        ${typeDefs}
        type Query {
            ${queryTypeDefs}
        }
        type Mutation {
            ${mutationTypeDefs}
        }
    `)
};
