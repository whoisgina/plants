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
        .then((response) => {
          console.log(response)
          if (response === 'authenticated') {
            this.loggedIn = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          this.submittedPassword = ''
        })  
    }
  }
}
</script>

<style lang="scss">
</style>
