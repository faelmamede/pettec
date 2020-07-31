<template>
    <div class="participants my-4">
        <div class="participants-top bg-dark">
            <div class="participants-title">
                <h1 class="text-white">Integrantes</h1>
            </div>
        </div>
        <div class="participants-content">
            <div>
                <ParticipantItem :participantName="tutor.name" :info="tutor.info" :imageUrl="require(`@/assets/participants/${tutor.img}`)"/>
            </div>
            <div v-for="student in students" :key="student.is">
                <ParticipantItem :participantName="student.name" :info="student.info" :imageUrl="require(`@/assets/participants/${student.img}`)" class="my-2"/>
            </div>
        </div>
    </div>
</template>

<script>
const { MEMBERS } = require('@/../.env')
import ParticipantItem from './ParticipantItem'

export default {
    name: 'Participants',
    components: {ParticipantItem},
    data: function(){
        return {
            tutor: MEMBERS.tutor,
            students: MEMBERS.students
        }
    }
}
</script>

<style>
    .participants {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .participants-top {
        width: 90%;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .participants-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
    }

    .participants-title h1 {
            font-size: 2rem;
    }

    .participants-content {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 0;
        background-color: #fff;
        padding: 25px;
        font-size: 1.2rem;
        box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);
    }

    @media (max-width: 650px) {
        .participants-title h1 {
            font-size: 1.6rem;
        }
    }
</style>