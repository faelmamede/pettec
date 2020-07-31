<template>
    <div class="user-pages">
        <div class="user-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Senha" active>
                        <UserConfigPassword />
                    </b-tab>
                </b-tabs> 
            </b-card>
        </div>
    </div>
</template>

<script>
import UserConfigPassword from './UserConfigPassword'

export default {
    name: 'UserConfigPages',
    components: { UserConfigPassword }
}
</script>

<style>

</style>