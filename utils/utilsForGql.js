const {ApolloError} = require('apollo-server');

function checkExistingResource(resource, failureIfExists = false,  errorMessage = null) {
    if (failureIfExists) {
        if (resource) {
            throw new ApolloError(errorMessage ? errorMessage : 'Resource is exists', '400');
        }
    } else {
        if (!resource) {
            throw new ApolloError(errorMessage ? errorMessage : 'Resource not found', '404');
        }
    }
    return resource;
}

module.exports = {
    checkExistingResource
}
