<template>
    <div>
        <!-- FREE Standard activity img https://pixabay.com/pt/illustrations/fundo-circuito-cinzento-digital-2426328/ -->
        <b-card
        :title="activity.name"
        :img-src="activity.imageUrl ? activity.imageUrl : require('@/assets/activities/standardImage.jpg') "
        img-alt="Image"
        img-height="210px"
        img-top
        class="mb-2 card-activity"
        >
            <b-card-text>
                {{activity.description}}
            </b-card-text>

            <router-link :to="{ name: 'activityById', params: { id: activity.id } } ">
                <b-button variant="dark" class="btn-activity">Ver</b-button>
            </router-link>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'ActivityItem',
    props: ['activity']
}
</script>

<style>
    .card-activity .card-text {
        height: 45px;
        overflow: hidden;
    }

    .card-activity{
        min-width: 270px;
    }

    @media (max-width: 500px) {
        
        .card-activity .card-img-top {
            height: 180px;
        }

        .card-activity .card-title {
            font-size: 1.3rem;
        }

        .card-activity .card-text {
            font-size: 0.8rem;
        }

        .btn-activity {
            font-size: 0.7rem;
        }

    }
</style>