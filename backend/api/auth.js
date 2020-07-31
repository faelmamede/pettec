const { USER_AUTH_SECRET } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError } = app.api.validations

    const signin = async (req, res) => {

        try {
            existsOrError(req.body.email, 'Informe o email!')
            existsOrError(req.body.password, 'Informe a senha!')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .whereNull('deletedAt')
            .first()

        if (!user) return res.status(400).send('Usuário não existe!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(400).send('Senha inválida!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            userAccess: user.userAccess,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, USER_AUTH_SECRET)
        })

    }

    const validateToken = async (req, res) => {
        const userData = req.body || null

        try {
            if(userData) {
                const token = jwt.decode(userData.token, USER_AUTH_SECRET)
                if(new Date(token.exp * 1000) > new Date() ) {
                    return res.send(true)
                }
            }

        }catch(msg) {
            // token problem
        }

        res.send(false)
    }

    return { signin, validateToken }
}