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
      console.log('watering')
      fetch('/.netlify/functions/update-record', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          fields: {lastWatered: moment().format('YYYY-MM-DD')},
          recordId: e.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => { this.getPlants() })
      .catch(error => console.error('Error:', error))
    },
    getPlants () {
      this.$emit('updateplants')
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
