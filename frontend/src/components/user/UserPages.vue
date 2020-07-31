<template>
    <div class="user-pages">
        <div class="user-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Notícias" active>
                        <UserNews />
                    </b-tab>
                    <b-tab title="Atividades">
                        <UserActivity />
                    </b-tab>
                </b-tabs> 
            </b-card>
        </div>
    </div>
</template>

<script>
import UserNews from './UserNews'
import UserActivity from './UserActivity'

export default {
    name: 'UserPages',
    components: { UserNews, UserActivity }
}
</script>

<style>

</style>