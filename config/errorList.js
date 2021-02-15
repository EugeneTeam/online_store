module.exports = {
    permissionErrors: {
        access_denied: {
            message: 'Access denied',
            code: '403'
        },
    },
    userErrors: {
        not_authorized: {
            message: 'Not authorized',
            code: '401'
        },
        user_not_found: {
            message: 'User not found',
            code: '404'
        },
        invalid_credential: {
            message: 'Wrong login and/or password',
            code: '401'
        },
        account_is_inactive: {
            message: 'Confirm your mail',
            code: '400'
        },
    },
    tokenErrors: {
        token_expired: {
            message: 'Token expired',
            code: '401'
        },
        token_required: {
            message: 'Token is required',
            code: '400'
        },
        invalid_token: {
            message: 'Invalid token',
            code: '400'
        }
    }
}

