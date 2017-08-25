<template>
    <v-app id="app" toolbar>
        <v-navigation-drawer permanent light v-if="false">
            <v-toolbar flat>
                <v-list>
                    <v-list-tile tag="div"></v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>what</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="cyan" dark>
            <v-toolbar-title>whatmovies</v-toolbar-title>
        </v-toolbar>
        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>
    </v-app>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>