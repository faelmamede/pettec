module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function isEmailOrError(email, msg){
        reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
        if ( !reg.test(email) ) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError, isEmailOrError }
}