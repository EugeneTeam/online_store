const Handlebars = require('handlebars');
const fs = require('fs');

const readFile = path => {
    return fs.readFileSync(__dirname + path, 'utf8');
}

const completeRegistration = readFile('/templates/completeRegistration.html');
const changePassword = readFile('/templates/changePassword.html');

const registrationTemplate = Handlebars.compile(completeRegistration.toString());
const changePasswordTemplate = Handlebars.compile(changePassword.toString());


module.exports = {//TODO в письмах есть устаревшие атрибуты html
    getCompleteRegistrationTemplate: ({username, url}) => (registrationTemplate({username, url})),
    getChangePasswordTemplate: ({username, url}) => (changePasswordTemplate({username, url})),
}
