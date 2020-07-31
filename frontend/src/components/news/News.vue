<template>
    <div class="news p-5">
        <div class="news-title">
            <h1> Notícias </h1>
            <hr class="my-4">
        </div>

        <div class="news-content">
            <ul class="container container-news">
                <div class="row">
                    <li v-for="newsItem in news" :key="newsItem.is" class="col-sm-12 col-md-4">
                        <NewsItem :newsItem="newsItem" class="mb-4 news-item" />
                    </li>
                </div>
            </ul>
        </div>

        <div class="load-more">
            <button v-if="loadMore" class="btn btn-lg btn-outline-dark mb-5"
                @click="getNews">
                Carregar Mais
            </button>
        </div>
        
        <p class="news-send mt-2">Deseja receber as últimas notícias e publicações do PET por e-mail? 
            <a v-b-modal.modal-center class="text-primary">
                clique aqui.
            </a>
        </p>

        <b-modal id="modal-center" centered> 
            <template v-slot:modal-header>
                <h5>Receba as últimas notícias do PET por email!</h5>
            </template>

             <template v-slot:default>
                <p>Digite seu nome e email nos campos abaixo, para começar receber todas as novidades do PETTEC!</p>
                <b-input v-model="person.name" id="name" placeholder="Digite seu nome aqui" class="mb-2"></b-input>
                <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-model="person.email" id="email" placeholder="Digite seu email aqui"></b-input>
                </b-input-group>
            </template>

            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="primary" @click="registerPerson">
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
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import NewsItem from './NewsItem'

export default {
    name: 'News',
    components: { NewsItem },
    data: function() {
        return {
            news: [],
            page: 1,
            loadMore: true,
            person: {}
        }
    },
    methods: {
        getNews() {
            const url = `${baseApiUrl}/news?page=${this.page}`
            axios(url).then(res => {
                this.news = this.news.concat(res.data.data)
                this.page++

                if(res.data.data.length === 0) this.loadMore = false
            })
        },
        registerPerson() {
            axios.post(`${baseApiUrl}/register/email`, this.person)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.person = {}
            })
            .catch(showError)
        }
    },
    mounted() {
        this.getNews()
    }
}
</script>

<style>
    .news {
        background-color: white;
        width: 100%;

    }

    .news .news-title {
        text-align: center;
    }

    .news .news-title h1{
        font-size: 2rem;
    }

    .news hr {
        border: 0;
        width: 100%;
        height: 2px;
        background-image: linear-gradient(to right, rgba(120,120,120,0), rgba(120,120,120,0.75), rgba(120,120,120,0));
    }

    .news-content {
        display: flex;
    }

    .news-content ul {
        list-style: none;
        display: flex;
        padding: 0px;
        flex-wrap: wrap;
    }

    .news-item {
        min-width: 342px;
        margin-right: 300px;
    }

    .load-more {
        display: flex;
        justify-content: center;
    }

    .news-send a {
        cursor: pointer;
    }

    @media (max-width: 1183px) {
        .news-item {
            min-width: 100px;
            margin-right: 0px;
        }

        .news .news-title h1{
            font-size: 1.5rem;
        }
    }

    @media (max-width: 600px) {
        
        .news {
            width: 100%;
        }

        .news-item {
            min-width: 100px;
            margin-right: 0px;
        }

        .news .news-title h1{
            font-size: 1.7rem;
        }

    }
</style>