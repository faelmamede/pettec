<template>
  <div id="app" :class="{'hide-header': !isHeaderVisible && hideHeader}">
    <Header id="top"/>
    <Menu />
    <Loading v-if="validatingToken" />
    <Content v-else/>
    <Footer />
    <a href="#top"><i class="fa fa-chevron-circle-up"></i></a>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'
import Menu from "@/components/template/Menu"
import Header from "@/components/template/Header"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from '@/components/auth/Loading'

const $ = require('jquery')
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('a[href="#top"]').fadeIn()
        } else {
            $('a[href="#top"]').fadeOut()
        }
    });

    $('a[href="#top"]').click(function(){
        $('html, body').animate({scrollTop : 0},800)
        return false;
    });
});

export default {
    name: 'App',
    components: { Menu, Header, Content, Footer, Loading },
    computed: mapState(['isHeaderVisible', 'hideHeader']),
    data: function() {
		return {
			validatingToken: true
		}
    },
    methods: {
		async validateToken() {
            this.validatingToken = true
            
			const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

			if(!userData || !userData.userAccess) {
                this.validatingToken = false
				return 
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setUser', userData)
			} else {
                localStorage.removeItem(userKey)
                this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
        this.validateToken()
    }
}

</script>

<style>
    * {
        font-family: 'Nunito', sans-serif;
        box-sizing: border-box;
    }

    body{
        margin: 0;
    }

    #app { 
        -webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

        height: 100vh;
        display: grid;
        grid-template-rows: 50px 155px 1fr 40px;
        grid-template-columns: 1fr;
        grid-template-areas: 
            "menu"
            "header"
            "content"
            "footer";
    }

    #app.hide-header{ 
        grid-template-rows: 50px 1fr 40px;
        grid-template-areas: 
            "menu"
            "content"
            "footer";
    }

    a[href="#top"]{
        padding:10px;
        position:fixed;
        top: 87%;
        right:20px;
        display: none;
        font-size: 30px;
        color: #343A40
    }

    a[href="#top"]:hover{
        text-decoration:none;
        color: rgba(52, 58, 64,0.7)
    }
</style>
