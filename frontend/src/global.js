import Vue from 'vue'
const { USER_KEY, BASE_API_URL } = require('../.env')

export const userKey = USER_KEY
export const baseApiUrl = BASE_API_URL

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg:e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }