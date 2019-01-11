import dotenv from 'dotenv'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

dotenv.config()

new Vue({
  render: h => h(App)
}).$mount('#app')
