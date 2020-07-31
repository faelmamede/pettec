<template>
  <main class="main">
      
    <div class="container home pt-1">

        <center>
            <b-carousel 
                id="carousel-1"
                :interval="4000"
                controls
                indicators
                background="#ababab"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333"
                class="main-carousel"
            >
                <!-- IMG Slide1 - FREE IMAGE - https://pixabay.com/pt/photos/bordo-placa-de-circuito-impresso-1429589/  --> 
                <!-- IMG Slide2 - FREE IMAGE  https://pixabay.com/pt/photos/c%C3%B3digo-editor-de-c%C3%B3digo-codifica%C3%A7%C3%A3o-1839406/  -->
                <b-carousel-slide
                    caption="Hardware"
                    :img-src="require('@/assets/home/slide1.jpg')"
                ></b-carousel-slide>

                <b-carousel-slide
                    caption="Software"
                    :img-src="require('@/assets/home/slide2.jpg')"
                ></b-carousel-slide>

                
            </b-carousel>
        </center>

        <div class="row row-cards pt-5" v-scroll="handleScroll" v-if="width>975">

            <div class="col-md-3 mb-4">
                <transition name="slide-fade" >
                    <div class="card" v-if="showFirstCard">
                        <i class="fa fa-3x fa-book"></i>
                        <div class="card-body">
                            <h5 class="card-title text-center">Desenvolvimento Acadêmico</h5>
                            <p class="card-text text-center">Desenvolvimento de pesquisas acadêmicas com padrões de qualidade e excelência.</p>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="col-md-3 mb-4">
                <transition name="slide-fade" >
                    <div class="card" v-if="showSecondCard">
                        <i class="fa fa-3x fa-microchip"></i>
                        <div class="card-body">
                            <h5 class="card-title text-center pb-1 mb-4">Hands-on</h5>
                            <p class="card-text text-center">Desenvolvimento prático e interdisciplinar das atividades em eletrônica e programação.</p>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="col-md-3 mb-4">
                <transition name="slide-fade" >
                    <div class="card" v-if="showThirdCard">
                        <i class="fa fa-3x fa-users"></i>
                        <div class="card-body">
                            <h5 class="card-title text-center">Desenvolvimento Social</h5>
                            <p class="card-text text-center">Realização de atividades de natureza coletiva, contribuindo para o desenvolvimento do trabalho em equipe.</p>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="col-md-3 mb-4">
                <transition name="slide-fade" >
                    <div class="card" v-if="showFourthCard">
                        <i class="fa fa-3x fa-line-chart"></i>
                        <div class="card-body">
                            <h5 class="card-title text-center pb-1 mb-4">Upgrade</h5>
                            <p class="card-text text-center">Favorececimento tanto para a integração profissional quanto para o desenvolvimento de estudos em programas de pós-graduação.</p>
                        </div>
                    </div>
                </transition>
            </div>

        </div>

        <div class="row row-cards-mobile pt-5" v-else v-scroll="handleScroll">
            <div class="col-6" @click="toggleModal('Desenvolvimento Acadêmico', 'Desenvolvimento de pesquisas acadêmicas com padrões de qualidade e excelência.')">
                <transition name="bounce" >
                    <div class="card card-mobile mb-2" v-if="showFirstCard">
                        <i class="fa fa-2x fa-book"></i>
                        <div class="card-body">
                            <h6 class="card-title text-center">Acadêmico</h6>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="col-6"  @click="toggleModal('Hands-on', 'Desenvolvimento prático e interdisciplinar das atividades em eletrônica e programação.')">
                <transition name="bounce" >
                    <div class="card card-mobile mb-2" v-if="showSecondCard">
                        <i class="fa fa-2x fa-microchip"></i>
                        <div class="card-body">
                            <h6 class="card-title text-center pb-1 mb-4">Hands-on</h6>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="col-6" @click="toggleModal('Desenvolvimento Social', 'Realização de atividades de natureza coletiva, contribuindo para o desenvolvimento do trabalho em equipe.')">
                <transition name="bounce" >
                    <div class="card card-mobile mb-4" v-if="showThirdCard">
                        <i class="fa fa-2x fa-users"></i>
                        <div class="card-body">
                            <h6 class="card-title text-center">Social</h6>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="col-6"  @click="toggleModal('Upgrade', 'Favorececimento tanto para a integração profissional quanto para o desenvolvimento de estudos em programas de pós-graduação.')">
                <transition name="bounce" >
                    <div class="card card-mobile mb-2" v-if="showFourthCard">
                        <i class="fa fa-2x fa-line-chart"></i>
                        <div class="card-body">
                            <h6 class="card-title text-center pb-1 mb-4">Upgrade</h6>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <b-modal
        v-model="showModal"
        :title="modalTitle"
        header-bg-variant='dark'
        header-text-variant="light"
        centered
        >
        <b-container fluid class="text-center">
            {{ modalContent }}
        </b-container>

        <template v-slot:modal-footer>
            <div class="w-100">
            <b-button
                variant="dark"
                size="sm"
                class="float-right"
                @click="showModal=false"
            >
                Fechar
            </b-button>
            </div>
        </template>
        </b-modal>
    </div>
    
    <News id = "news" class="pt-4"/>
    <Activities id = "activities" class="mt-1 pt-4"/>

  </main>
</template>

<script>
import News from "@/components/news/News"
import Activities from "@/components/activities/Activities"

export default {
    name: "Home",
    components: { News, Activities }, 
    data: function() {
        return {
                rollbar: false,

                // variables used to show the cards animation at the home page
                showFirstCard: false,
                showSecondCard: false,
                showThirdCard: false,
                showFourthCard: false,

                // variables used to show the modal in mobile devices
                showModal: false,
                modalTitle: '',
                modalContent: '',
        } 
    },
    computed: {
        width() {
            return document.documentElement.clientWidth
        }
    },
    methods: {
        handleScroll(evt, el) {
            let docWidth = document.documentElement.clientWidth;
            if (window.scrollY > 100 && docWidth > 975) {
                el.setAttribute(
                    this.showFirstCard = true,
                    setTimeout(() => {
                        this.showSecondCard = true
                    }, 250),
                    setTimeout(() => {
                        this.showThirdCard = true
                    }, 500),
                    setTimeout(() => {
                        this.showFourthCard = true
                    }, 750)
                )
            } else if (window.scrollY > 80 && docWidth <= 975) {
                el.setAttribute(
                    this.showFirstCard = true,
                    setTimeout(() => {
                        this.showSecondCard = true
                    }, 350),
                    setTimeout(() => {
                        this.showThirdCard = true
                    }, 700),
                    setTimeout(() => {
                        this.showFourthCard = true
                    }, 1050)
                )
            }
            return window.scrollY > 100
        },
        toggleModal(title, content){
            this.modalTitle = title
            this.modalContent = content
            this.showModal = true
        }
    }
};
</script>

<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main-carousel img {
        height: 600px;
    }

    .home .card i{
        padding-top: 20px;
        text-align: center;
    }

    .home .card {
        min-height: 275px;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.2);
    }

    .home .card-mobile {
        box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2);
    }

    .home .card-mobile:active {
        box-shadow: none;
    }

    .home .card:hover {
        cursor: default;
    }

    .slide-fade-enter-active {
        transition: all 0.8s ease;
        
    }
    .slide-fade-leave-active {
        transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    .bounce-enter-active {
        animation: bounce-in 1s;
    }
    .bounce-leave-active {
        animation: bounce-in 1s reverse; 
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    

    @media (min-width: 1400px) {

        .home {
            min-height: 1140px;
        }

        .main-carousel {
            width: 1110px;
            justify-content: center;
            align-items: center;
        }

        .main-carousel img {
            height: 752px;
        }

        .home .card {
            font-size: 0.9rem;
        }

    }

    @media (max-width: 1366px) {

        .home {
            min-height: 810px;
        }

        .main-carousel {
            width: 850px;
        }

        .main-carousel img {
            height: 440px;
        }

        .home .card {
            font-size: 0.9rem;
        }

    }

    @media (max-width: 975px) {

        .home {
            min-height: 630px;
        }
        
        .home .container {
            width: 100%;
        }

        .main-carousel {
            width: 100%;
        }

        .home img {
            height: 340px;
        }

        .home .card {
            font-size: 1rem;
            min-height: 140px;
        }

        .row-cards .card-text {
            display: none;
        }

    }

    @media (max-width: 600px) {
        
        .home .container {
            width: 100%;
        }

        .main-carousel {
            width: 100%;
        }

        .home img {
            height: 300px;
        }

        .home .card {
            font-size: 1rem;
            min-height: 60px;
            max-height: 120px;
        }

    }

</style>