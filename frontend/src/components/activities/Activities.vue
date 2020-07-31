<template>
    <div class="activities">
        <div class="activities-title">
            <h1> Atividades </h1>
            
            <b-form class="col-6 mt-3" inline style="flex-wrap:nowrap;">
                <b-form-input @keydown.enter.prevent="search()" size="sm" id="search-activity" type="text" v-model="searchActivity" placeholder="Pesquisar atividade..." />
                <b-button size="sm" variant="dark" class="ml-1" @click="search"><i class="fa fa-search"></i></b-button>
                <b-button size="sm" variant="dark" class="ml-1" @click="searching = false;searchingActivities=[];searchActivity=''" v-if="searching"><i class="fa fa-times-circle"></i></b-button>
            </b-form>

            <hr class="my-4">
        </div>

        <div class="activities-content" v-if="!searching">
            <ul class="container container-activities">
                <div class="row">
                    <li v-for="activity in activities" :key="activity.is" class="col-sm-12 col-md-4">
                        <ActivityItem :activity="activity" class="my-2"/>
                    </li>
                </div>
            </ul>
        </div>

        <div v-else class="activities-searching">
            <ul class="container container-searching">
                <div class="row">
                    <li v-for="activity in searchingActivities" :key="activity.is" class="col-sm-12 my-2">
                        <router-link :to="{ name: 'activityById', params: { id: activity.id } }">
                            <span class="searching-name">{{activity.name}}</span> - <span class="searching-description">{{activity.description}}</span>
                        </router-link>
                    </li>
                </div>
            </ul>
        </div>

        <div class="load-more" v-if="!searching">
            <button v-if="loadMore" v-on:click="getActivities" class="btn btn-lg btn-outline-dark mb-5">
                Carregar Mais
            </button>
        </div>
        
    </div>
</template>

<script>
import ActivityItem from './ActivityItem'
import { baseApiUrl } from '@/global'
import axios from 'axios'


export default {
    name: 'Activities',
    components: { ActivityItem },
    data: function() {
        return {
            activities: [],
            searchingActivities: [],
            page: 1,
            loadMore: true,
            searchActivity: '',
            searching: false
        }
    },
    methods: {
        getActivities() {
            const url = `${baseApiUrl}/activities?page=${this.page}`
            axios(url).then(res => {
                this.activities = this.activities.concat(res.data.data)
                this.page++

                if(res.data.data.length === 0) this.loadMore = false
            })
        },
        async search() {
            const searchingName = this.searchActivity ? this.searchActivity.toLowerCase() : ''
            this.searchingActivities = []

            if(searchingName){
                this.searching = true
                await axios.get(`${baseApiUrl}/activities/search`).then(res => {this.searchingActivities = this.searchingActivities.concat(res.data)})
                
                this.searchingActivities = this.searchingActivities.map(activity => {
                    activity.name = activity.name.toLowerCase()
                    return activity
                })
                this.searchingActivities = this.searchingActivities.filter(activity => activity.name.indexOf(`${searchingName}`) !== -1)

                console.log(this.searchingActivities)
            }
        }
    },
    mounted() {
        this.getActivities()
    }
}
</script>

<style>
    .activities {
        background-color: white;
        width: 100%;
        min-height: 672px;
    }

    .activities .activities-title {
        text-align: center;
    }

    .activities .activities-title h1{
        font-size: 2rem;
    }

    .activities hr {
        border: 0;
        width: 100%;
        height: 2px;
        background-image: linear-gradient(to right, rgba(120,120,120,0), rgba(120,120,120,0.75), rgba(120,120,120,0));
    }

    .activities-content {
        display: flex;
    }

    .activities-content ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
    }

    .activities-searching span {
        color: black;
    }

    .activities-searching ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
    }

    .searching-name {
        font-size: 1.4rem;
    }

    .load-more {
        display: flex;
        justify-content: center;
    }

    @media(max-width: 600px) {
        .activities .activities-title h1{
            font-size: 1.7rem;
        }
    }
</style>