module.exports = middlwere => {
    return (req, res, next) => {
        if(req.user.admin){
            middlwere(req, res, next)
        } else {
            res.status(401).send('Usuário não é administrador!')
        }
    }
}