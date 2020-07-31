<template>
    <div class="admin-pages">
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Usuários" active>
                        <AdminUsers />
                    </b-tab>
                </b-tabs> 
            </b-card>
        </div>
    </div>
</template>

<script>
import AdminUsers from './AdminUsers'

export default {
    name: 'UserPages',
    components: { AdminUsers }
}
</script>

<style>

</style>