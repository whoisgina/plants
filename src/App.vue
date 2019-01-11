<template>
  <div id="app">
    <Header :loggedIn="loggedIn" @authenticate="authenticate" />
    <Home 
      :loggedIn="loggedIn" 
      :plants="plants" 
      :species="species"
      @updateplants="getPlants"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header'
import Home from './views/Home'

export default {
  name: 'home',

  components: {
    Header,
    Home
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
      fetch('/.netlify/functions/get-table?table=Species', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(response => {
        this.species = response.records
      }).catch(error => {
        console.log(error)
        this.species = []
      })
    },

    getPlants () {
      fetch('/.netlify/functions/get-table?table=Plants', {
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
