<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="currentUser.id" />

             <b-row>
                 <b-col>
                    <p class="text-muted">
                        Deseja alterar sua senha de acesso? Digite sua nova senha nos campos abaixo.
                    </p>
                 </b-col>
            </b-row>
            <hr>

            <b-row>
                <b-col md="6">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password" v-model="currentUser.password" placeholder="senha..."/>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password" v-model="currentUser.confirmPassword" placeholder="confirmação de senha..."/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" @click="save">Salvar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'UserConfigPassword',
    computed: mapState(['user']),
    data: function() {
        return {
            currentUser: {}
        }
    },
    methods: {
        loadUser() {
            this.currentUser.id = this.user.id
        },
        reset() {
            this.currentUser = {}
            this.loadUser()
        },
        save() {
            const method = 'put'
            const id = `/${this.currentUser.id}`
            axios[method](`${baseApiUrl}/user/config${id}`, this.currentUser)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
        
    },
    mounted() {
        this.loadUser() 
    }
}
</script>

<style>

</style>