<template>
    <section class="main-content main-content--list">
        <router-link :to="{ name: 'Home' }">Go back back back...</router-link>
       <h4>{{ list_data.name }}</h4>
        <v-layout row>
            <v-flex>
                <v-text-field id="movie-search" :class="[{error: movie_search_error}]" type="text" v-model="movie_search" @keyup.enter="searchMovies" label="Movie Search"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row-sm column child-flex-sm>
            <v-card>
                <v-flex>
                    <ul v-if="list_movies">
                        <li v-for="(list_movie, key) in list_data.movies" v-bind:data-id="key"><span>{{ list_movie.title }}</span><v-btn small error v-on:click="removeFromList(key)">Remove</v-btn></li>
                    </ul>
                </v-flex>
            </v-card>

            <v-card v-if="movie_results.length">
                <v-card>
                    <v-list two-line class="movie-results">
                        <template v-for="movie_result in movie_results">
                            <v-list-tile avatar v-bind:data-id="movie_result.id" v-on:click="addToList(movie_result)">
                                <v-list-tile-avatar v-if="movie_result.poster_path">
                                    <img :src="'https://image.tmdb.org/t/p/w185' + movie_result.poster_path"></v-list-tile-avatar>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-if="movie_result.title">{{ movie_result.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title v-if="movie_result.genre_ids">
                                        <span v-for="movie_genre in movie_result.genre_ids">{{ getGenre(movie_genre) }}, </span>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-card>
            </v-card>
        </v-layout>
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
            },
            list_movies: {
                source: fb_database.ref('lists/' + this.$route.params.list_id + '/movies'),
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
            movie_genres: [],
            movies_ids_in_list: []
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


        this.$firebaseRefs.list_movies.on('value', (snapshot) => {
            let vals = snapshot.val();
            let new_list = [];
            for(let key in vals) {
                if(vals.hasOwnProperty(key)) {
                    new_list.push(vals[key].id);
                };
            }

            this.movies_ids_in_list = new_list;
        });
    },
    methods: {
        removeFromList: function(key) {
            this.$firebaseRefs.list_movies.child(key).remove();
        },
        addToList: function(movie) {
            if(this.movies_ids_in_list.indexOf(movie.id) == -1) {
                this.$firebaseRefs.list_movies.push({
                    id: movie.id,
                    title: movie.title
                });
            }
        },
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
            })
            .catch(error => {
                console.log(error);
            });
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
<style>
.input-group__details:before {
    background: #424242;
}
</style>