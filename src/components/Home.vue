<template>
    <section class="main-content main-content--home">
        <h4>{{ title }}</h4>
        <v-layout row>
            <v-flex>
                <v-text-field id="movie-search" v-model="newList" @keyup.enter="addList" label="Add List"></v-text-field>
            </v-flex>
        </v-layout>
        <ul class="lists">
            <li v-for="(list, key) in lists" v-if="key != '.key'">
                <router-link :to="{ name: 'List', params: { list_id: key } }">
                    <list-teaser v-bind="list" v-bind:data-id="key"></list-teaser>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import fb_database from '@/db';
import List from '@/components/List';
import ListTeaser from '@/components/ListTeaser';

// Auth
//let fb_provider = new firebase.auth.GoogleAuthProvider();

export default {
    name: 'hello',
    data () {
        return {
            title: 'Home',
            newList: ''
        }
    },
    firebase() {
        return {
            lists: {
                source: fb_database.ref('lists'),
                asObject: true
            }
        }
    },
    components: {
        List,
        ListTeaser
    },
    created: function() {
        //console.log(this.$firebaseRefs.lists);
    },
    methods: {
        addList: function() {
            let value = this.newList && this.newList.trim();
            if(!value) {
                return;
            }

            this.$firebaseRefs.lists.push({
                name: value,
                timestamp: Date.now()
            });

            this.newList = '';
        }
    }
}
</script>
<style>
.input-group__details:before {
    background: #424242;
}
</style>