<template>
    <div class="menu">

        <b-navbar toggleable="lg" type="dark" variant="dark">
            
            <router-link to="/">
                <b-navbar-brand>PETTEC</b-navbar-brand>
            </router-link>
            
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                     <b-nav-item class="nav-link" to="/">
                        Página Principal
                    </b-nav-item>

                    <b-nav-item-dropdown :text="'Postagens'">
                        <b-dropdown-item class="nav-link" href="#news" v-on:click="verifyURL"><i class="fa fa-bell"></i> Notícias</b-dropdown-item>
                        <div class="dropdown-divider"></div>
                        <b-dropdown-item class="nav-link" href="#activities" v-on:click="verifyURL"><i class="fa fa-file"></i> Atividades</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Sobre">
                        <b-dropdown-item class="nav-link" to="/sobre/pet" ><i class="fa fa-info-circle"></i> O que é o PET</b-dropdown-item>
                        <b-dropdown-item class="nav-link" to="/sobre/integrantes"><i class="fa fa-users"></i> Integrantes</b-dropdown-item>
                        <div class="dropdown-divider"></div>
                        <b-dropdown-item class="nav-link" to="/sobre/contato"><i class="fa fa-envelope"></i> Contato</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto" >

                    <b-nav-item class="nav-link" v-show="!isUserDropDownVisible" to="/autenticacao">
                        Login
                    </b-nav-item>

                    <b-nav-item-dropdown v-if="user" right v-show="isUserDropDownVisible" :text="user.name" class="user-options">
                        <b-dropdown-item to="/admin" v-if="user.admin" class="nav-link"><i class="fa fa-users"></i> Controle de usuários</b-dropdown-item>
                        <b-dropdown-item to="/usuario" class="nav-link"><i class="fa fa-folder-open"></i> Controle de postagens</b-dropdown-item>
                        <b-dropdown-item to="/usuario/config" class="nav-link"><i class="fa fa-cog"></i> Configurações de conta</b-dropdown-item>
                        <b-dropdown-item href  @click.prevent="logout" class="nav-link"><i class="fa fa-sign-out"></i> Sair</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
                <div class="show-mobile pt-2">
                    <a class="contact-instagram" href="https://www.instagram.com/pettec_unifei/" target="_blank"><i class="fa fa-instagram"></i></a>
                    <!-- <a class="contact-guitHub pl-2" href="#" target="_blank"><i class="fa fa-github"></i></a> -->
                </div>
            </b-collapse>
        </b-navbar>

    </div>
</template>

<script>
const $ = require('jquery')
import { userKey } from '@/global'
import { mapState } from 'vuex'

export default {
    name: "Menu",
    computed: mapState(['isUserDropDownVisible', 'user']),
    methods: {
        verifyURL(event) {
            event.preventDefault()
            const currentPath = window.location.pathname
            const el = event.target
            if(currentPath != '/') {
                this.$router.push({ path: '/' })
                setTimeout(() => {el.click(function(){
                    $('html, body').animate({scrollTop: $( $.attr(el, 'href') ).offset().top}, 1200);
                    return false
                })}, 300)
            } else {
                 $('html, body').animate({scrollTop: $( $.attr(el, 'href') ).offset().top}, 1200);
            }
        },
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style>
    .menu {
        width: 100%;
        z-index: 100;
    }

    .menu a:active {
        background: none;
        color: black;
    }

    .menu .nav-link {
        padding: 0px;
    }

    .login-item:hover {
        text-decoration: none;
        color: #DDD;
    }

    .login-form {
        width: 230px;
    }

    .user-options a {
        text-decoration: none;
        color: black;
    }

    .user-options a:hover {
        text-decoration: none;
        color: black;
    }

    .dropdown-item {
        display: inline-block;
        width: 100%;
    }

    .show-mobile {
        font-size: 20px;
        display: none;
    }

    .show-mobile a {
        color: rgba(255, 255, 255, 0.747);
    }

    .show-mobile a:hover {
        color: rgba(255, 255, 255, 0.932);
    }

    .show-mobile a:active {
        color: rgba(255, 255, 255, 0.932);
    }

    @media (max-width: 992px) {
        .menu .nav-link {
            padding: 4.5px;
        }

        .show-mobile {
            display: block;
        }
    }

</style>