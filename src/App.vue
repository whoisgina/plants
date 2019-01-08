<template>
  <div id="app">
    <Header :loggedIn="loggedIn" @authenticate="authenticate" />
    <router-view 
      :loggedIn="loggedIn" 
      :plants="plants" 
      :species="species"
    />
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
      loggedIn: false,
      plants: [],
      species: []
    }
  },

  mounted () {
    this.getSpecies()
    this.getPlants()
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
    },

    getSpecies () {
      this.$airtable.getTable('Plant%20species').then(data => {
        this.species = data.records
      }).catch(error => {
        console.log(error)
        this.species = []
      })
    },

    getPlants () {
      fetch('/.netlify/functions/get-plants', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(response => {
        this.plants = response.records
      }).catch(error => {
        console.log(error)
        this.plants = []
      })
    }

  }
}
</script>

<style lang="scss">
</style>
