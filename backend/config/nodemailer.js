const nodemailer = require('nodemailer')
const { NOTIFICATION_EMAIL, NOTIFICATION_PASSWORD } = require('../.env')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: NOTIFICATION_EMAIL,
        pass: NOTIFICATION_PASSWORD
    },
    tls: { rejectUnauthorized: false }
})

module.exports = {
    mailOption(from, to, subject, html) {
        return {
            from,
            to,
            subject,
            html
        }
    },
    sendEmail(mailOptions) {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Sent: ' + info.response);
            }
        })
    }
}