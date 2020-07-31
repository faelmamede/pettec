import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import Pet from '@/components/about/Pet'
import Contact from '@/components/about/Contact'
import Participants from '@/components/about/Participants'
import ActivityById from '@/components/activities/ActivityById'
import UserPages from '@/components/user/UserPages'
import UserConfigPages from '@/components/user/UserConfigPages'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'pet',
    path: '/sobre/pet',
    component: Pet

}, {
    name: 'contact',
    path: '/sobre/contato',
    component: Contact
}, {
    name: 'participants',
    path: '/sobre/integrantes',
    component: Participants
}, {
    name: 'activityById',
    path: '/atividade/:id',
    component: ActivityById
},{
    name: 'auth',
    path: '/autenticacao',
    component: Auth
},{
    name: 'userPages',
    path: '/usuario',
    component: UserPages,
    meta: { requiresUserAccess: true }
},{
    name: 'userConfigPages',
    path: '/usuario/config',
    component: UserConfigPages,
    meta: { requiresUserAccess: true }
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach( (to, from, next) => {
    const json = localStorage.getItem(userKey)
    const user = JSON.parse(json)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        user && user.admin ? next() : next({ path: '/' })
    } else if(to.matched.some(record => record.meta.requiresUserAccess)) {
        user && user.userAccess ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router