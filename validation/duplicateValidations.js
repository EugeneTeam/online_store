const string = {
    is: {
        args: [/^[a-zA-Z ]+$/g],
        msg: 'The name can only contain characters and spaces'
    },
    len: {
        args: [3, 30],
        msg: 'The name must be between 3 and 15 characters long, including spaces'
    }
}

const float = {
    IsFloat: {
        args: [true],
        msg: 'Only integers and floating point numbers are allowed'
    }
}

module.exports = {
    string,
    float
}
