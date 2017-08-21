<template>
    <section class="main-content main-content--list">
        <router-link :to="{ name: 'Home' }">Go back back back...</router-link>
        <h1>List: {{ list_data.name }}</h1>
        <h3>Timestamp: {{ list_data.timestamp }}</h3>
    </section>
</template>

<script>
import fb_database from '@/db';
let fb_list = null;

export default {
    name: 'List',
    firebase() {
        return {
            list_data: {
                source: fb_database.ref('lists/' + this.$route.params.list_id),
                asObject: true
            }
        }
    },
    data () {
        return {
        }
    },
    created() {
        //this.$firebaseRefs.list_data = fb_database.ref('lists/' + this.$route.params.list_id);
        //console.log(this.$firebaseRefs);
    }
}
</script>
