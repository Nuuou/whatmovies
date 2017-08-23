<template>
    <section class="main-content main-content--list">
        <router-link :to="{ name: 'Home' }">Go back back back...</router-link>
        <h1><strong>{{ list_data.name }}</strong></h1>
        <label for="movie-search">Search Movies</label>
        <input id="movie-search" :class="[{error: movie_search_error}]" type="text" v-model="movie_search" @keyup.enter="searchMovies">
        <div class="movie-results-container">
            <ul class="movie-results">
                <li v-for="movie_result in movie_results" v-bind:data-id="movie_result.id">
                    <img :src="'https://image.tmdb.org/t/p/w185' + movie_result.poster_path" v-if="movie_result.poster_path">
                    <div class="movie-info">
                        <div class="movie-title" v-if="movie_result.title"><strong>{{ movie_result.title }}</strong></div>
                        <ul class="movie-genres" v-if="movie_result.genre_ids">
                            <li v-for="movie_genre in movie_result.genre_ids" v-bind:data-genre-id="movie_genre">{{ getGenre(movie_genre) }}</li>
                        </ul>
                    </div>
                </li>
            </ul>
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
            movie_info: {},
            movie_genres: []
        }
    },
    created: function() {
        this.$jsonp('https://api.themoviedb.org/3/genre/movie/list', {
            language: 'en-US',
            api_key: 'a8d0b489a47ea579975f71e33fdf1503',
            callbackQuery: 'callback',
            callbackName: 'receive'
        })
        .then(data => {
            this.movie_genres = data.genres;
        })
        .catch(error => {
            console.log(error);
        });
    },
    methods: {
        getGenre: function(id) {
            return this.movie_genres.filter(genre => genre.id == id)[0].name;
        },
        searchMovies: function() {
            this.$jsonp('https://api.themoviedb.org/3/search/movie', {
                query: this.movie_search,
                include_adult: false,
                language: 'en-US',
                api_key: 'a8d0b489a47ea579975f71e33fdf1503',
                callbackQuery: 'callback',
                callbackName: 'receive'
            })
            .then(data => {
                this.movie_results = data.results;
                console.log(data.results);
            })
            .catch(error => {
                console.log(error);
            });
            /*
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    query: this.movie_search,
                    include_adult: false,
                    language: 'en-US',
                    api_key: 'a8d0b489a47ea579975f71e33fdf1503'
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
            */

        },
        showInfo: function(id) {
            axios.get('https://omdbapi.com', {
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

    > li {
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
