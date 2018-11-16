<template>
  <div class="home">
    <!-- <nav class="sorting-nav">
      <span class="sorting-nav__heading">Sort by:</span>
      <a 
        class="sorting-nav__item" 
        v-for="(sortKey, index) in 4" 
        :key="`sort-key-${index}`"
        @click="sortOrder = sortKey"
        :class="{active: sortOrder == sortKey}"
      >
        {{ sortKey }}
      </a>
    </nav> -->
    <PlantGrid 
      :plants="this.plantsWithSpecies"
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
import _ from 'lodash'

export default {
  name: 'home',
  components: {
    PlantGrid
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
          'lastWatered': moment().format('YYYY-MM-DD')
        }
      }).then((response) => { this.getPlants() })
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 3rem;
}

.sorting-nav {
  grid-column: 1 / -1;

  a {
    margin-left: 1rem;
  }
}
</style>
