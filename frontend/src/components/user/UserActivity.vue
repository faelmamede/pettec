<template>
    <div class="activity-user container-fluid p-0">
        <b-form>
            <input id="activity-id" type="hidden" v-model="activity.id" />
            <input id="activity-userId" type="hidden" v-model="activity.userId" />

            <div class="row">
                <b-form-group label="Título:" label-for="activity-name" class="col-6">
                    <b-form-input id="activity-name" type="text" v-model="activity.name"
                        placeholder="Informe o título da atividade..."
                        :readonly="mode === 'remove'"/>
                </b-form-group>

                <b-form-group label="Descrição:" label-for="activity-description" class="col-6">
                    <b-form-input id="activity-description" type="text"
                        v-model="activity.description" placeholder="Informe a descrição da atividade..." 
                        :readonly="mode === 'remove'"/>
                </b-form-group>
            </div>
            
            <div class="row">
                <b-form-group v-if="mode === 'save'" label="Imagem (URL):" label-for="activity-imageUrl" class="col-6">
                    <b-form-input id="activity-imageUrl" type="text"
                        v-model="activity.imageUrl" placeholder="Se a URL não for informada, uma imagem padrão será utilizada." />
                </b-form-group>
            </div>
            
            <div class="row">
                <b-form-group v-if="mode === 'save'" label="Conteúdo" label-for="activity-content" class="col" >
                    <VueEditor v-model="activity.content" placeholder="Informe o conteúdo da atividade..." />
                </b-form-group>
            </div>

            <b-row v-if="mode === 'save'">
                <b-col md="6">
                    <b-form-checkbox id="activity-sendNotification" v-model="activity.sendNotification" class="mt-3 mb-4">
                        Enviar notificação de postagem para os emails?
                    </b-form-checkbox>
                </b-col>
            </b-row>

            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>

        <b-table hover striped :items="activities" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadActivity(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadActivity(data.item, 'remove')">
                    <i class="fa fa-minus-circle"></i>
                </b-button>
            </template>
        </b-table>
        
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'UserActivity',
    components: { VueEditor },
    computed: mapState(['user']),
    data: function() {
        return {
            mode: 'save',
            activity: {},
            activities: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código'},
                { key: 'name', label: 'Título'},
                { key: 'description', label: 'Descrição'},
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadActivities() {
            const url = `${baseApiUrl}/user/activities?page=${this.page}`
            axios.get(url).then(res => {
                this.activities = res.data.data
                this.count = res.data.count
                this.limit = res.data.limitUserPage
            })
        },
        reset() {
            this.mode = 'save'
            this.activity = {}
            this.activity.sendNotification = true
            this.loadActivities()
            this.loadUser()
        },
        save() {
            const method = this.activity.id ? 'put' : 'post'
            const id = this.activity.id ? `/${this.activity.id}` : ''
            axios[method](`${baseApiUrl}/user/activities${id}`, this.activity)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.activity.id
            axios.delete(`${baseApiUrl}/user/activities/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadActivity(activity, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/user/activities/${activity.id}`)
                .then(res => {
                    this.activity = res.data
                    this.activity.sendNotification = true
                    this.loadUser()
                })
        },
        loadUser() {
            this.activity.userId = this.user.id
        }
    },
    watch: {
        page() {
            this.loadActivities()
        }
    },
    mounted() {
        this.reset()
    }
}
</script>

<style>

</style>