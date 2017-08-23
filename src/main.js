// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueJsonp from 'vue-jsonp'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueFire);
Vue.use(VueJsonp, 5000);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
