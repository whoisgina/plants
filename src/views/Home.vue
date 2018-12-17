<template>
  <div class="home">
    <nav class="sorting-nav">
      <span class="sorting-nav__heading">Sort by:</span>
      <a 
        class="sorting-nav__item" 
        v-for="(sortKey, index) in Object.keys(sortedPlantsOptions)" 
        :key="`sort-key-${index}`"
        @click="sortOrder = sortKey"
        :class="{active: sortOrder == sortKey}"
      >
        {{ sortKey }}
      </a>
    </nav>

    <plant-card v-for="(plant, index) in sort(sortOrder)" 
                :plant="plant"
                :key="`plant-card-${index}`" 
                @watered="handleWatered"/>
  </div>
</template>

<script>
import Airtable from '@/services/Airtable'
import PlantCard from '@/components/PlantCard.vue'
import PlantService from '@/services/PlantService'
import SpeciesService from '@/services/SpeciesService'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'home',
  components: {
    PlantCard
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
    },
    sortedPlantsOptions () {
      var plants = this.plantsWithSpecies
      return {
        'Thirst': () => { return _.sortBy(plants, plant => plant.fields.nextWatered) },
        'Pet Name': () => { return _.sortBy(plants, plant => plant.fields.name) },
        'Species': () => { return _.sortBy(plants, plant => plant.species.fields.species) }
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
  display: grid;
  font-family: 'Styrene B';
  grid-gap: 3rem;
  padding: 3rem;
  
  @include mobile { grid-template-columns: repeat(2, 1fr); }
  @include tablet { grid-template-columns: repeat(3, 1fr); }
  @include laptop { grid-template-columns: repeat(3, 1fr); }
  @include desktop { grid-template-columns: repeat(4, 1fr); }
}

.sorting-nav {
  grid-column: 1 / -1;

  a {
    margin-left: 1rem;
  }
}
</style>
