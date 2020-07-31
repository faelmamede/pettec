<template>
    <div class="news-user container-fluid p-0">
        <b-form>
            <input id="news-id" type="hidden" v-model="pieceOfNews.id" />
            <input id="news-userId" type="hidden" v-model="pieceOfNews.userId" />

            <div class="row">
                <b-form-group label="Título:" label-for="news-name" class="col-6">
                    <b-form-input id="news-name" type="text" v-model="pieceOfNews.name"
                        placeholder="Informe o título da notícia..."
                        :readonly="mode === 'remove'"/>
                </b-form-group>

                <b-form-group label="Descrição:" label-for="news-description" class="col-6">
                    <b-form-input id="news-description" type="text"
                        v-model="pieceOfNews.description" placeholder="Informe a descrição da notícia..." 
                        :readonly="mode === 'remove'"/>
                </b-form-group>
            </div>
            
            <div class="row">
                <b-form-group v-if="mode === 'save'" label="Conteúdo" label-for="news-content" class="col" >
                    <div class="md-form">
                        <textarea id="news-content" class="md-textarea form-control" rows="3"
                        v-model="pieceOfNews.content" placeholder="Informe o conteúdo da notícia aqui..."></textarea>
                    </div>
                </b-form-group>
            </div>

            <b-row  v-if="mode === 'save'">
                <b-col md="6">
                    <b-form-checkbox id="news-sendNotification" v-model="pieceOfNews.sendNotification" class="mt-3 mb-4">
                        Enviar notificação de postagem para os emails?
                    </b-form-checkbox>
                </b-col>
            </b-row>

            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>

        <b-table hover striped :items="news" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadPieceOfNews(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadPieceOfNews(data.item, 'remove')">
                    <i class="fa fa-minus-circle"></i>
                </b-button>
            </template>
        </b-table>
        
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'UserNotice',
    computed: mapState(['user']),
    data: function() {
        return {
            mode: 'save',
            pieceOfNews: {},
            news: [],
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
        loadNews() {
            const url = `${baseApiUrl}/user/news?page=${this.page}`
            axios.get(url).then(res => {
                this.news = res.data.data
                this.count = res.data.count
                this.limit = res.data.limitUserPage
            })
        },
        reset() {
            this.mode = 'save'
            this.pieceOfNews = {}
            this.pieceOfNews.sendNotification = true
            this.loadNews()
            this.loadUser()
        },
        save() {
            const method = this.pieceOfNews.id ? 'put' : 'post'
            const id = this.pieceOfNews.id ? `/${this.pieceOfNews.id}` : ''
            axios[method](`${baseApiUrl}/user/news${id}`, this.pieceOfNews)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.pieceOfNews.id
            axios.delete(`${baseApiUrl}/user/news/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadPieceOfNews(pieceOfNews, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/user/news/${pieceOfNews.id}`)
                .then(res => {
                        this.pieceOfNews = res.data
                        this.pieceOfNews.sendNotification = true
                        this.loadUser()
                    })
        },
        loadUser() {
            this.pieceOfNews.userId = this.user.id
        }
    },
    watch: {
        page() {
            this.loadNews()
        }
    },
    mounted() {
        this.reset()

    }
}
</script>

<style>

</style>