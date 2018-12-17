<template>
  <section class="plant-grid">
    <nav class="sorting-nav">
      <span class="sorting-nav__heading">Sort by:</span>
        <a 
          class="sorting-nav__option"
          v-for="(sortKey, index) in sortByOptions"
          :key="index"
          @click="sortBy = sortKey.name"
        >
          {{ sortKey.label }}
        </a> 
        <input class="sorting-nav__option" type="checkbox" id="show-only-thirsty" v-model="showOnlyThirsty">
        <label for="show-only-thirsty">Thirsty Plants Only</label>
    </nav>
    <plant-card
      v-for="(plant, index) in filteredSortedPlants" 
      :plant="plant"
      :key="index" 
      :index="index"
      @watered="handleWatered"
    />
  </section>
</template>

<script>
import PlantCard from '@/components/PlantCard.vue'
import moment from 'moment'

export default {
  name: 'PlantGrid',

  components: {
    PlantCard
  },

  props: {
    plants: Array
  },

  data () {
    return {
      sortBy: 'THIRST_RATING',
      sortByOptions: [
        { 
          name: 'THIRST_RATING',
          label: 'Thirstiness'
        },
        {
          name: 'SPECIES_NAME',
          label: 'Species Name'
        },
        {
          name: 'PET_NAME',
          label: 'Pet Name'
        }
      ],
      showOnlyThirsty: false
    }
  },

  computed: {
    sortedPlants () {
      if (this.sortBy === 'THIRST_RATING') {
        return this.plantsByThirst
      } else if (this.sortBy === 'PET_NAME') {
        return this.plantsByName
      } else if (this.sortBy === 'SPECIES_NAME') {
        return this.plantsBySpecies
      } else {
        return this.plants
      }
    },
    plantsByThirst () {
      return [...this.plants].sort((plantA, plantB) => {
        let nextWateredA = Date.parse(plantA.fields.nextWatered)
        let nextWateredB = Date.parse(plantB.fields.nextWatered)
        return nextWateredA <= nextWateredB ? -1 : 1
      })
    },
    plantsBySpecies () {
      return [...this.plants].sort((plantA, plantB) => {
        return plantA.species.fields.species <= plantB.species.fields.species ? -1 : 1
      })
    },
    plantsByName () {
      return [...this.plants].sort((plantA, plantB) => {
        return plantA.fields.name <= plantB.fields.name ? -1 : 1
      })
    },
    filteredSortedPlants () {
      if (this.showOnlyThirsty) {
        return [...this.sortedPlants].filter((plant) => {
          return this.checkThirst(plant)
        })
      } else {
        return this.sortedPlants
      }
    }
  },

  methods: {
    handleWatered (e) {
      this.$emit('watered', e)
    },
    checkThirst (plant) {
      let nextWatered = moment(plant.fields.nextWatered, moment.ISO_8601)
      let daysUntilThirsty = nextWatered.diff(moment(), 'days')
      if (daysUntilThirsty <= 0) {
        return plant
      } else return null
    }
  }
}
</script>

<style lang="scss">
.plant-grid {
  display: grid;
  font-family: 'Styrene B';
  grid-gap: 3rem;
  
  @include mobile { grid-template-columns: repeat(2, 1fr); }
  @include tablet { grid-template-columns: repeat(3, 1fr); }
  @include laptop { grid-template-columns: repeat(3, 1fr); }
  @include desktop { grid-template-columns: repeat(4, 1fr); }
}

.sorting-nav {
  &__option {
    margin-left: 1rem;
  }
}
</style>
