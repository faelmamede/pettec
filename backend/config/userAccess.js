module.exports = middlwere => {
    return (req, res, next) => {
        if(req.user.userAccess) {
            middlwere(req, res, next)
        } else {
            res.status(401).send('Usuário não possui autorização, solicite permissão para um administrador!')
        }
    }
}