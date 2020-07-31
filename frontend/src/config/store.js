import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isHeaderVisible: true,
        hideHeader: false,
        user: null,
        isUserDropDownVisible: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isUserDropDownVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isUserDropDownVisible = false
            }
        }
    }
})