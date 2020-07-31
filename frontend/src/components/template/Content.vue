<template>
    <div class="content">
        <transition name="slide-fade" mode="out-in"><router-view/></transition>
    </div>
</template>

<script>
export default {
    name: "Content"
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: #DDD;
        animation-delay: 1s;
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
</style>