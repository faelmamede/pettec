const moment = require('moment')
const { NOTIFICATION_EMAIL } = require('../.env')
const {mailOption, sendEmail} = require('../config/nodemailer')

module.exports = app => {
    const { existsOrError } = app.api.validations

    const save = async (req, res) => {

        const newNews = { ...req.body }
        if(req.params.id) newNews.id = req.params.id

        try {
            existsOrError(newNews.name, 'Título não informado!')
            existsOrError(newNews.description, 'Descrição não informada!')
            existsOrError(newNews.content, 'Conteúdo da notícia não informado!')
            existsOrError(newNews.userId, 'Autor da postagem não informado!')
            const sendNotification =  newNews.sendNotification
            delete newNews.sendNotification

            // search in the bank the people that want to receive the notices in their emails
            const peopleFromDB = await app.db('emails')
            const emails = peopleFromDB.map(person => person.email)

            const emailTo = emails
            const emailHtml = `<div><h2>${newNews.name}</h2>
                               <p>${newNews.description}</p></div><hr>
                               <p>${newNews.content.toString()}</p>
                               <p>Este é um e-email automático, não é necessário respondê-lo.</p>`

            newNews.postAt = moment()        

            if(newNews.id) {
                const emailSubject = 'PETTEC - Notícia modificada'
                const mailOptions = mailOption(NOTIFICATION_EMAIL, emailTo, emailSubject, emailHtml )

                newNews.modified = true
    
                app.db('news')
                    .update(newNews)
                    .where({ id: newNews.id })
                    .then(() => {
                        if(sendNotification) sendEmail(mailOptions)
                        return res.status(204).send()
                    })
                    .catch(err => res.status(500).send(err))
            } else {
                const emailSubject = 'PETTEC - Nova notícia'
                const mailOptions = mailOption(NOTIFICATION_EMAIL, emailTo, emailSubject, emailHtml )
                
                app.db('news')
                    .insert(newNews)
                    .then(() => { 
                        if(sendNotification) sendEmail(mailOptions)
                        return res.status(204).send()
                    })
                    .catch(err => res.status(500).send(err))
            }


        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    // function used to get the news that will apear in the main page "/"
    const limitMainPage = 3
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('news').count('id').first()
        const count = parseInt(result.count)

        app.db({n: 'news', u: 'users'})
            .select('n.id', 'n.name', 'n.description','n.content', 'n.modified', 'n.postAt', { author: 'u.name' })
            .limit(limitMainPage).offset(page * limitMainPage - limitMainPage)
            .whereRaw('?? = ??', ['u.id', 'n.userId'])
            .orderBy('n.id', 'desc')
            .then(news => {
                news.forEach(pieceOfNews => {
                    pieceOfNews.content = pieceOfNews.content.toString()
                })
                return res.json({ data: news, count, limitMainPage }) 
            })
            .catch(err => res.status(500).send(err))
    }

    // function used to get the news that will apear in the user page "/user"
    const limitUserPage = 8
    const getFromUser = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('news').count('id').first()
        const count = parseInt(result.count)

        app.db({n: 'news', u: 'users'})
            .select('n.id', 'n.name', 'n.description','n.content', 'n.postAt', { author: 'u.name' })
            .limit(limitUserPage).offset(page * limitUserPage - limitUserPage)
            .whereRaw('?? = ??', ['u.id', 'n.userId'])
            .orderBy('n.id', 'desc')
            .then(news => {
                news.forEach(notice => {
                    notice.content = notice.content.toString()
                })
                return res.json({ data: news, count, limitUserPage }) 
            })
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('news')
            .where({ id: req.params.id })
            .first()
            .then(pieceOfNews => {
                pieceOfNews.content = pieceOfNews.content.toString()
                return res.json(pieceOfNews)
            })
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('news')
                .where({ id: req.params.id })
                .del()

            try {
                existsOrError(rowsDeleted, 'Notícia não encontrada!')
            } catch(msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getFromUser, getById, remove }
}