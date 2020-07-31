<template>
    <footer class="footer bg-dark">
        <span>© 2020 PETTEC - Programa de Educação Tutorial. All rights reserved.</span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        color: #DDD;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>