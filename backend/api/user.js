const bcrypt = require('bcrypt-nodejs')
const { NOTIFICATION_EMAIL } = require('../.env')
const {mailOption, sendEmail} = require('../config/nodemailer')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

    // function used to encrypt the password using the salt
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // function used to generate a random password
    const generatePassword = () => {
        return Math.random().toString(36).slice(-10);
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        // if the user ins't registered yet
        if(!user.id) {
            try {
                existsOrError(user.name, 'Nome não informado!')
                existsOrError(user.email, 'Email não informado!')
                
                // check if the user already exists
                const userFromDB = await app.db('users').where({ email: user.email }).first()
                notExistsOrError(userFromDB, 'Usuário já cadastrado!')

                user.password = generatePassword()

                const emailTo = user.email
                const emailSubject = 'Bem vindo ao PETTEC'
                const emailHtml = `<h1>${user.name}, temos o prazer de recebê-lo no nosso sistema!</h1>
                                    <p>Sua senha de acesso é <span style="font-size: 20px; background-color: #e9e9e9;">${user.password}</span>.</p>
                                    <p>Este é um e-email automático, não é necessário respondê-lo.</p>`
                const mailOptions = mailOption(NOTIFICATION_EMAIL, emailTo, emailSubject, emailHtml )

                user.password = encryptPassword(user.password)

                app.db('users')
                    .insert(user)
                    .then(() => {
                        sendEmail(mailOptions)
                        return res.status(204).send()
                    })
                    .catch(err => res.status(500).send(err))

            } catch(msg) {
                return res.status(400).send(msg)
            }

        } else {    // if the admin want to change an user information
            try {
                app.db('users')
                    .update(user)
                    .where({ id: user.id })
                    .whereNull('deletedAt')
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))

            } catch(msg) {
                return res.status(400).send(msg)
            }
            
        }
    }

    // if the user is registered and want to change his password
    const changePassword =  (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(user.password, 'Senha não informada!')
            existsOrError(user.confirmPassword, 'Confirmação de senha não informada!')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem!')
            
            delete user.confirmPassword
            user.password = encryptPassword(user.password)
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))

        } catch(msg) {
            return res.status(400).send(msg)
        }
    }

    // function used to redefine a user password with a random password that will send by email to the user
    const resetPassword = async (req, res) => {
        const user = { ...req.body }
        try {
            existsOrError(user.email, 'Email não informado!')
            user.password = generatePassword()

            const userFromDB = await app.db('users')
                .where({ email: user.email })
                .whereNull('deletedAt')
                .first()
            existsOrError(userFromDB, 'E-mail não cadastrado!')
            
            const emailTo = userFromDB.email
            const emailSubject = 'Alteração de senha - PETTEC'
            const emailHtml = `<h1>${userFromDB.name},</h1>
                                <p>Sua nova senha de acesso é <span style="font-size: 20px; background-color: #e9e9e9;">${user.password}</span>.</p>
                                <p>Este é um e-email automático, não é necessário respondê-lo.</p>`
            const mailOptions = mailOption(emailTo, emailSubject, emailHtml )

            console.log(user.password)
            user.password = encryptPassword(user.password)

            app.db('users')
                .update(user)
                .where({ id: userFromDB.id })
                .whereNull('deletedAt')
                .then(() => {
                    sendEmail(mailOptions)
                    return res.status(204).send('Senha alterada!')
                })
                .catch(err => res.status(500).send(err))

        } catch(msg) {
            return res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'userAccess', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).status(err))
    }

    const getById = (req, res) => {
        const id = req.params.id
        app.db('users')
            .select('id', 'name', 'email')
            .where({ id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, changePassword, resetPassword, get, getById, remove }
}