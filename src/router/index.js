import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'whatmovies | home'
            }
        },
        {
            path: '/list/:list_id',
            name: 'List',
            component: List,
            meta: {
                title: 'whatmovies | list'
            }
        }
    ]
});

router.afterEach(route => {
    document.title = route.meta.title;
});

export default router;