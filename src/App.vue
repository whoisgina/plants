<template>
  <div id="app">
    <input class="password-input" v-model="submittedPassword"/>
    <button @click="authenticate">Login</button>
    <router-view :loggedIn="loggedIn" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',

  data () {
    return {
      loggedIn: false,
      submittedPassword: ''
    }
  },

  methods: {
    authenticate () {
      axios.get(`/.netlify/functions/login?submission=${this.submittedPassword}`)
        .then(function (response) {
          this.loggedIn = true
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          this.submittedPassword = ''
        })  
    }
  }
}
</script>

<style lang="scss">
</style>
