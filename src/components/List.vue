<template>
    <section class="main-content main-content--list">
        <router-link :to="{ name: 'Home' }">Go back back back...</router-link>
        <h1><strong>{{ list_data.name }}</strong></h1>
        <label for="movie-search">Search Movies</label>
        <input id="movie-search" :class="[{error: movie_search_error}]" type="text" v-model="movie_search" @keyup.enter="searchMovies">
        <div class="movie-results-container">
            <ul class="movie-results">
                <li v-for="movie_result in movie_results" v-bind:data-imdb-id="movie_result.imdbID" v-on:click="showInfo(movie_result.imdbID)">
                    <img v-if="movie_result.Poster" :src="movie_result.Poster">
                    <span class="movie-title" v-if="movie_result.Title"><strong>{{ movie_result.Title }}</strong><span class="movie-year" v-if="movie_result.Year"> ({{ movie_result.Year }})</span></span>
                </li>
            </ul>
            <div class="movie-info">
                <span class="movie-title" v-if="movie_info.Title"><a :href="'http://imdb.com/title/' + movie_info.imdbID" target="_blank"><strong>{{ movie_info.Title }}</strong></a><span class="movie-year" v-if="movie_info.Year"> ({{ movie_info.Year }})</span></span>
                <br>
                <span class="movie-director" v-if="movie_info.Director">Director: {{ movie_info.Director }}</span>
                <br>
            </div>
        </div>
    </section>
</template>

<script>
import fb_database from '@/db';
import axios from 'axios';
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
            movie_search_error: false,
            movie_search: '',
            movie_results: [],
            movie_info: {}
        }
    },
    methods: {
        searchMovies: function() {
            axios.get('http://omdbapi.com', {
                params: {
                    s: this.movie_search,
                    type: 'movie',
                    apikey: '4893e7fc'
                }
            })
            .then((response) => {
                let data = response.data;
                if(data.Response === "False") {
                    this.movie_search_error = true;
                    this.movie_results = [];
                    this.movie_info = {};
                    return;
                }

                this.search_error = false;
                this.movie_results = data.Search;
            })
            .catch((error) => {
                this.movie_search_error = true;
                this.movie_results = [];
                this.movie_info = {};
            });

        },
        showInfo: function(id) {
            axios.get('http://omdbapi.com', {
                params: {
                    i: id,
                    apikey: '4893e7fc'
                }
            })
            .then((response) => {
                let data = response.data;
                this.movie_info = data;
            })
            .catch((error) => {
                this.movie_info = {};
            });
        }
    }
}
</script>
<style lang="scss" scoped>
input {
    &.error {
        border: 1px solid tomato;
    }
}

.movie-results-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.movie-results {
    padding-left: 0;
    width: 50%;
    list-style: none;

    img {
        margin-right: 20px;
        width: 150px;
        height: auto;
    }

    li {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px 0;
        box-shadow: 0 -1px 0 0 #ccc inset;

        &:last-of-type {
            box-shadow: none;
        }
    }
}
.movie-info {
    width: 50%;
}
</style>
