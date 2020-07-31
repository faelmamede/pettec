<template>
    <div class="participant mt-2">
        <img v-if="imageUrl" :src="imageUrl" class="rounded float-left" alt="Participant image">
        <!-- USER STANDARD IMG - FREE IMAGEM - https://pixabay.com/pt/vectors/foto-do-perfil-em-branco-973460/ -->
        <img v-else src="@/assets/participants/standardParticipantImg.png" class="rounded float-left" alt="Participant image">
        <p class="participant-name">{{ participantName }}</p>
        <p class="participant-info">{{ info }} </p>
    </div>
</template>

<script>
export default {
    name: 'ParticipantItem',
    props: ['imageUrl', 'participantName', 'info']
}
</script>

<style>
    .participant img {
        width: 120px;
        height: 120px;
        margin-right: 20px;
        margin-bottom: 20px;
        background: lightgray;
    }

    .participant-name {
        font-size: 1.2rem;
    }

    .participant-info {
        font-size: 1rem;
    }

    @media (max-width: 650px) {
        .participant img {
            width: 100px;
            height: 100px;
        }

        .participant-name {
            font-size: 1.1rem;
        }
    }

</style>