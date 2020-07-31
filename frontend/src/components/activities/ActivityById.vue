<template>
    <div class="activity-by-id my-4">
        <div class="activity-top bg-dark">
            <div class="activity-title">
                <h1 class="text-white">{{activity.name}}</h1>
                <h5 class="text-white-50 p-2 font-italic text-center">{{activity.description}}</h5>
            </div>
        </div>
        <div class="activity-content" v-html="activity.content"></div>
    </div>
</template>

<script>
const $ = require('jquery')

import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'ActivityById',
    data: function() {
        return {
            activity: {}
        }
    },
    mounted() {
        $('html, body').animate({scrollTop : 0})
        const url = `${baseApiUrl}/activities/${this.$route.params.id}`
        axios.get(url).then(res => this.activity = res.data)
    }
}
</script>

<style>
    .activity-by-id {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .activity-top {
        width: 90%;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .activity-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
    }

    .activity-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
        margin: 0;
        background-color: #fff;
        padding: 25px;
        font-size: 1.1rem;
        box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);
    }

    .ql-video {
        width: 500px;
        height: 250px;
    }

    .activity-content img {
        max-width: 100%;
    }

    .activity-content :last-child {
        margin-bottom: 0px;
    }

    @media (max-width: 600px) {
        
        .ql-video {
            width: 100%;
            height: 200px;
        }

        .activity-title h1 {
            font-size: 1.6rem;
        }

        .activity-title h5 {
            font-size: 1rem;
        }

        .activity-content {
            /* font-size: 1rem; */
        }


    }
</style>