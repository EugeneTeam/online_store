require('dotenv').config({path: '../.env'});
const {createTransport} = require('nodemailer');
const {getChangePasswordTemplate: changePassword} = require('./handlebars');
const {getCompleteRegistrationTemplate: completeRegistration} = require('./handlebars');

const templateList = {
    changePassword,
    completeRegistration
}

let transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_AUTHORIZATION_LOGIN,
        pass: process.env.GMAIL_AUTHORIZATION_PASSWORD
    },
});

const sendMail = async (to, subject, text, templateName, data) => {
    await transporter.sendMail({
        from: process.env.GMAIL_FROM,
        to,
        subject,
        text,
        html: templateList[templateName](data),
    })
}

module.exports = {
    sendMail
}
