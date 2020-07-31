<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo/logo.jpeg" alt="Logo" width="100"/>
            <hr>
            <div class="auth-title">{{'Login' }}</div>

            <input v-model="user.email" placeholder="E-mail" type="text" name="email" @keydown.enter.prevent="signin"/>
            <input v-model="user.password" placeholder="Senha" type="password" name="password" @keydown.enter.prevent="signin" />

            <button @click="signin">Entrar</button>
            
            <a v-b-modal.modal-center>
                <span>Esqueceu sua senha? clique aqui.</span>
            </a>
        </div>
        <b-modal id="modal-center" centered> 
            <template v-slot:modal-header>
                <!-- Emulate built in modal header close button action -->
                <h5>Redefinição de senha</h5>
            </template>

             <template v-slot:default>
                <p>Uma nova senha será enviada por email.</p>
                <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-model="user.email" id="inline-form-input-username" placeholder="Digite o email aqui"></b-input>
                </b-input-group>
            </template>

            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="primary" @click="passwordReset">
                    OK
                </b-button>
                <b-button variant="dark" @click="cancel">
                    Cancel
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    if(res.data.userAccess) {
                        this.$store.commit('setUser', res.data)
                        localStorage.setItem(userKey, JSON.stringify(res.data))
                        this.$router.push({ path: '/usuario' })
                    } else {
                        throw "Usuario não possui permissão para acesso!"
                    }
                })
                .catch(showError)
        },
        passwordReset() {
            axios.post(`${baseApiUrl}/forgetPassword`, this.user)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.user = {}
            })
            .catch(showError)
        }
    },
    created() {
		this.$store.state.isHeaderVisible = false
    },
    destroyed() {
        this.$store.state.isHeaderVisible = true
    }
}
</script>

<style>
    .auth-content{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .auth-modal {
        background-color: #F7F7F7;
        border-radius: 20px;
        width: 350px;
        padding: 15px;
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: center;
        background-color: rgba(0,0,0,0.7);
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal a:hover {
        cursor: pointer;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right, rgba(120,120,120,0), rgba(120,120,120,0.75), rgba(120,120,120,0));
    }


</style>