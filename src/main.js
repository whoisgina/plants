import dotenv from 'dotenv'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import airtablePlugin from './plugins/airtable'

Vue.config.productionTip = false

dotenv.config()

Vue.use(airtablePlugin, {
  appId: process.env.VUE_APP_APP_ID,
  appKey: process.env.VUE_APP_API_KEY
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
