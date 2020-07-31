<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />

            <b-row>
                 <b-col>
                    <p class="text-muted">
                        Informe os campos abaixo somente se deseja criar um novo usuário. Tenha certeza do email digitado, pois é nele que o 
                        usuário receberá a senha de acesso para o sistema.
                    </p>
                 </b-col>
            </b-row>
            <hr>
            
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text" v-model="user.name" placeholder="Informe o nome do usuário..." :readonly="mode === 'edit_remove' "/>
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text" v-model="user.email" placeholder="Informe o e-mail do usuário..." :readonly="mode === 'edit_remove'"/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6">
                    <b-form-checkbox id="user-userAccess" v-model="user.userAccess" class="mt-3 mb-3">
                        Acesso ao sistema?
                    </b-form-checkbox>
                </b-col>

                <b-col md="6">
                    <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3">
                        Administrador?
                    </b-form-checkbox>
                </b-col>

            </b-row>
             
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" @click="save" class="mr-2">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'edit_remove'" @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>

        </b-form>
        <hr>

        <b-table hover striped :items="users" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="info" @click="loadUser(data.item, 'edit_remove' )" class="mr-2">
                    <i class="fa fa-pencil"></i> / <i class="fa fa-minus-circle"></i>
                </b-button>
            </template>
        </b-table>

    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'userAccess', label: 'Acesso ao sistema', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
        
    },
    mounted() {
        this.loadUsers() 
    }
}
</script>

<style>

</style>