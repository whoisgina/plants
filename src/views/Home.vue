<template>
  <div class="home">
    <PlantGrid 
      :plants="this.plantsWithSpecies"
      :loggedIn="loggedIn"
      @watered="handleWatered"
    />
  </div>
</template>

<script>
import Airtable from '@/services/Airtable'
import PlantGrid from '@/components/PlantGrid.vue'
import PlantService from '@/services/PlantService'
import SpeciesService from '@/services/SpeciesService'
import moment from 'moment'

export default {
  name: 'home',
  components: {
    PlantGrid
  },

  props: {
    loggedIn: Boolean
  },

  data () {
    return {
      plants: [],
      species: [],
      sortOrder: 'Thirst'
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
    sort (sortOrder) {
      return this.sortedPlantsOptions[sortOrder]()
    },
    handleWatered (e) {
      Airtable().patch('/Studio%20plants/' + e.id, {
        'fields': {
          'lastWatered': moment().format('YYYY-MM-DD')
        }
      }).then((response) => { this.getPlants() })
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 2rem;

  @include mobile { padding: 4rem; }
}
</style>
