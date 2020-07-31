<template>
    <div class="news-item" v-on:click="showContent()">
        <b-card 
            :id="newsItem.id"
            :title="newsItem.name"
            :sub-title="newsItem.description"
            class="mb-2 hover"
        >
            <b-card-text v-if="showNewsContent">
                {{ newsItem.content }} <br/>
                <a v-if="showNewsContent" v-on:click.stop="hideContent()" class="text-primary hover"><i class="fa fa-minus-circle"></i> Mostrar menos</a>
            </b-card-text>
             <b-card-text v-if="!showNewsContent">
                <p>Clique para ler o conteúdo!</p>
            </b-card-text>
            <template v-slot:footer>
                <small class="text-muted ">
                    <span>{{ newsItem.modified ? "Modifcado" : "Publicado" }}</span> por {{ newsItem.author }} em {{ postAt }}
                </small>
            </template>
        </b-card>
    </div>
</template>

<script>
const moment = require('moment')
const $ = require('jquery')

export default {
    name: 'NewsItem',
    props: ['newsItem'],
    data: function() {
        return {
            showNewsContent: false
        }
    },
    methods: {
        showContent() {
            this.showNewsContent = true
            $(`#${this.newsItem.id}`).removeClass("hover")
        },
        hideContent() {
            this.showNewsContent = false
            $(`#${this.newsItem.id}`).addClass("hover")
        }
    },
    computed: {
        postAt() {
            moment.locale('pt-BR');
            return moment(this.newsItem.postAt).format('llll');
        }
    }
}
</script>

<style>
    .hover:hover{
        cursor: pointer;
    }

</style>