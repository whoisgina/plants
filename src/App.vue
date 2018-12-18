<template>
  <div id="app">
    <form v-if="!loggedIn" class="login-form" v-on:submit.prevent="authenticate">
      <input class="password-input" v-model="submittedPassword"/>
      <input type="submit"/>
    </form>
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
      console.log('submitted' + this.submittedPassword)
      axios.get(`/.netlify/functions/login?submission=${this.submittedPassword}`)
        .then((response) => {
          console.log(response)
          if (response.data === 'authenticated') {
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
