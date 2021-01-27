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
        if (module.resolver() !== undefined) {
            resolvers.push(module.resolver());
        }
        if (module.resolver() !== undefined) {
            typeDefs.push(module.typeDefs())
        }
        if (module.resolver() !== undefined) {
            mutationTypeDefs.push(module.mutationTypeDefs())
        }
        if (module.resolver() !== undefined) {
            queryTypeDefs.push(module.queryTypeDefs())
        }
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
