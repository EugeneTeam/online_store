const {ApolloError} = require('apollo-server');

const checkFields = (args, requiredFieldsList) => {
    requiredFieldsList.forEach(field => {
        if (args[field] === undefined) {
            throw new ApolloError(`${field} is required`, '400');
        }
    })
}

module.exports = {
    checkFields
}
