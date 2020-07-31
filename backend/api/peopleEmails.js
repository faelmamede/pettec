const { NOTIFICATION_EMAIL } = require('../.env')
const {mailOption, sendEmail} = require('../config/nodemailer')

module.exports = app => {
    const { existsOrError, notExistsOrError, isEmailOrError} = app.api.validations

    const save = async (req, res) => {
        const person = { ...req.body }

        try {
            existsOrError(person.name, 'Nome não informado!')
            existsOrError(person.email, 'Email não informado!')
            isEmailOrError(person.email, 'Esse não é um formato válido de emails!')

            const personFromDB = await app.db('emails').where({ email: person.email }).first()
            notExistsOrError(personFromDB, 'Email já cadastrado!')

            const emailTo = person.email
            const emailSubject = 'Agora você ficará por dentro das novidades do PETTEC'
            const emailHtml = `<h1>${person.name},</h1>
                                <p>Agora você receberá todas as notícias por email, pode ficar tranquilo que ficará sabendo das últimas novidades do PETTEC no momento em que forem publicadas no sistema!</p>
                                <p>Este é um e-email automático, não é necessário respondê-lo.</p>`
            const mailOptions = mailOption(NOTIFICATION_EMAIL, emailTo, emailSubject, emailHtml )

            app.db('emails')
                    .insert(person)
                    .then(() => {
                        sendEmail(mailOptions)
                        return res.status(204).send()
                    })
                    .catch(err => res.status(500).send(err))

        } catch(msg) {
            return res.status(400).send(msg)
        }

    }

    return { save }

}