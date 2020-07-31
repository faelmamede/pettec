<template class="head">
    <transition name="slide-fade">
        <header class="header" v-if="isHeaderVisible">
            <div class="img-logo"><img src="@/assets/logo/logo.jpeg" alt="logo"></div>
            <h1 class="text-muted"> PET - Tecnologia em Eletrônica e Computação</h1>
        </header>
    </transition >
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Header',
    computed: mapState(['isHeaderVisible', 'hideHeader']),
    updated() {
        this.$store.state.hideHeader = false
        if (!this.$store.state.isHeaderVisible) {
            setTimeout(() => {
                this.$store.state.hideHeader = true
            },300)
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        border-bottom: 2px solid rgba(0,0,0,0.3);
        background-color: #F7F7F7;
    }

    .img-logo {
        display: flex;
        justify-content: center;
        align-items: center;
    }
   

    .header img {
        padding: 10px;
        width: 180px;
        height: 120px;
    }

    .header h1 {
        font-family: 'Roboto', sans-serif;
        display: flex;
        justify-content: center;
        color: rgba(0, 0, 0, 0.6);
        margin: 0;
        padding: 0;
    }

    @media (min-width: 1400px) {
        .header img {
            width: 8.8rem;
            height: 120px;
        }

        .header h1 {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 1366px) {
        .header img {
            width: 8.8rem;
            height: 120px;
        }

        .header h1 {
            font-size: 1.4rem;
        }
    }

     @media (max-width: 555px) {
        .header img {
            width: 9rem;
            height: 125px;
        }
        .header h1 {
            font-size: 1.1rem;
        }
    }

    @media (max-width: 366px) {
        .header h1 {
            font-size: 1rem;
        }

    }


    
</style>