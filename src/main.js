import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import generalFunctions from './services/generalFunctions'
import VueCountdownTimer from 'vuejs-countdown-timer';
Vue.use(VueCountdownTimer);
import (/* webpackPreload: true */ './style.css')

Vue.config.productionTip = false
Vue.mixin(generalFunctions)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
