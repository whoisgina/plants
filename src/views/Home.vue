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
import moment from 'moment'

export default {
  name: 'home',
  components: {
    PlantGrid
  },

  props: {
    loggedIn: Boolean,
    plants: Array,
    species: Array
  },

  data () {
    return {
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

  methods: {
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
  display: flex;
  justify-content: center;
}
</style>
