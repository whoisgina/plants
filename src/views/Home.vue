<template>
  <div class="home">
    <plant-card v-for="(plant, index) in sortedPlants" 
                :plant="plant"
                :key="index" 
                :index="index"
                @watered="handleWatered"/>
  </div>
</template>

<script>
import Airtable from '@/services/Airtable'
import PlantCard from '@/components/PlantCard.vue'
import PlantService from '@/services/PlantService'
import SpeciesService from '@/services/SpeciesService'
import moment from 'moment'

export default {
  name: 'home',
  components: {
    PlantCard
  },

  data () {
    return {
      plants: [],
      species: []
    }
  },

  computed: {
    plantsWithSpecies () {
      if (this.plants.length === 0 || this.species.length === 0) {
        return []
      } else {
        return this.plants.map(p => {
          let currentSpecies = this.species.find(s => s.id === p.fields.species[0])
          // Add a fail default
          return {
            ...p,
            species: currentSpecies
          }
        })
      }
    },
    sortedPlants () {
      return this.plantsWithSpecies.slice().sort(this.compareValues('nextWatered'))
    }
  },

  mounted () {
    this.getPlants()
    this.getSpecies()
  },

  methods: {
    async getPlants () {
      const response = await PlantService.getPlants()
      this.plants = response.data.records
    },
    async getSpecies () {
      const response = await SpeciesService.getSpecies()
      this.species = response.data.records
    },
    handleWatered (e) {
      Airtable().patch('https://api.airtable.com/v0/app0mdITu5g9AvhRY/Studio%20plants/' + e.id, {
        'fields': {
          'nextWatered': moment().format('YYYY-MM-DD')
        }
      }).then((response) => { this.getPlants() })
    },
    compareValues (key, order = 'asc') {
      return function (a, b) {
        if (!a.fields.hasOwnProperty(key) || !b.fields.hasOwnProperty(key)) {
          return 0
        }

        const varA = (typeof a.fields[key] === 'string')
          ? a.fields[key].toUpperCase() : a.fields[key]
        const varB = (typeof b.fields[key] === 'string')
          ? b.fields[key].toUpperCase() : b.fields[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  font-family: $type-family-sans;
  grid-gap: 3rem;
  padding: 3rem;
  
  @include mobile { grid-template-columns: repeat(2, 1fr); }
  @include tablet { grid-template-columns: repeat(3, 1fr); }
  @include laptop { grid-template-columns: repeat(3, 1fr); }
  @include desktop { grid-template-columns: repeat(4, 1fr); }
}
</style>
