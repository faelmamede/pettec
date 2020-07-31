const { STANDARD_ADMIN_EMAIL, STANDARD_ADMIN_PASSWORD } = require('../.env')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // function used to define/redefine a standard admin to the system
    const setStandardAdmin = async (req, res) => {
        admin = { name: "Administrador", email: STANDARD_ADMIN_EMAIL, password: STANDARD_ADMIN_PASSWORD, deletedAt: null, admin: true, userAccess: true}

        admin.password = encryptPassword(admin.password)

        // check if the standard admin already exists
        const adminFromDB = await app.db('users').where({ email: admin.email }).first()
        
        if(adminFromDB) {
            app.db('users')
                .update(admin)
                .where({ id: adminFromDB.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(admin)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    return {setStandardAdmin}

}