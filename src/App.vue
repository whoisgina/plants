<template>
  <div id="app">
    <Header :loggedIn="loggedIn" @authenticate="authenticate" />
    <router-view :loggedIn="loggedIn" />
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header'

export default {
  name: 'home',

  components: {
    Header
  },

  data () {
    return {
      loggedIn: false
    }
  },

  mounted () {
    this.$airtable.getTable('Plant species').then(data => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  },

  methods: {
    authenticate (submittedPassword) {
      console.log('submitted' + submittedPassword)
      axios.get(`/.netlify/functions/login?submission=${submittedPassword}`)
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
        })  
    }
  }
}
</script>

<style lang="scss">
</style>
