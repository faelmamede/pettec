const userAccess = require('./userAccess')
const admin = require('./admin')
const {STANDARD_ADMIN_ROUTE} = require("../.env")

module.exports = app => {
    app.post(STANDARD_ADMIN_ROUTE, app.api.standardAdmin.setStandardAdmin)

    app.post('/signin', app.api.auth.signin)
    app.post('/forgetPassword', app.api.user.resetPassword)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.user.get))
        .post(admin(app.api.user.save))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.user.getById))
        .put(admin(app.api.user.save))
        .delete(admin(app.api.user.remove))

    app.route('/user/config/:id')
        .all(app.config.passport.authenticate())
        .put(userAccess(app.api.user.changePassword))

    app.route('/activities')
        .get(app.api.activities.get)

    app.route('/activities/search')
        .get(app.api.activities.search)

    app.route('/activities/:id')
        .get(app.api.activities.getById)

    app.route('/user/activities')
        .all(app.config.passport.authenticate())
        .get(userAccess(app.api.activities.getFromUser))
        .post(userAccess(app.api.activities.save))

    app.route('/user/activities/:id')
        .all(app.config.passport.authenticate())
        .get(userAccess(app.api.activities.getById))
        .put(userAccess(app.api.activities.save))
        .delete(userAccess(app.api.activities.remove))

    app.route('/news')
        .get(app.api.news.get)

    app.route('/news/:id')
        .get(app.api.news.getById)

    app.route('/user/news')
        .all(app.config.passport.authenticate())
        .get(userAccess(app.api.news.getFromUser))
        .post(userAccess(app.api.news.save))

    app.route('/user/news/:id')
        .all(app.config.passport.authenticate())
        .get(userAccess(app.api.news.getById))
        .put(userAccess(app.api.news.save))
        .delete(userAccess(app.api.news.remove))

    app.route('/register/email')
        .post(app.api.peopleEmails.save)
}   