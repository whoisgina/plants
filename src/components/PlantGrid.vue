<template>
  <section class="plant-grid">
    <div class="plant-grid__header">
      <div class="plant-grid__callout">
        <template v-if="thirstyPlantsCount === 'Zero'">
          All of your plants are happy.
        </template>
        <template v-else>
          <a>{{ thirstyPlantsCount }}</a> of your plants are thirsty.
        </template>
      </div>
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
      </nav>
    </div>
    <plant-card
      v-for="(plant, index) in filteredSortedPlants" 
      :plant="plant"
      :loggedIn="loggedIn"
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
    plants: Array,
    loggedIn: Boolean
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
    thirstyPlantsCount () {
      let thirstyPlants = [...this.sortedPlants].filter((plant) => {
        return this.checkThirst(plant)
      })
      const converter = require('number-to-words')
      let asWord = converter.toWords(thirstyPlants.length)
      // Capitalize the first letter
      return asWord[0].toUpperCase() + asWord.substring(1)
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 4rem;
  display: grid;
  width: 90%;

  &__header {
    grid-column: 1 / -1;

    @include tablet {
      display: flex;
      align-items: baseline;
      justify-content: space-between; 
    }
  }
  
  &__callout {
    font-size: 2.5rem;
    line-height: 1.25;
    margin-bottom: 2rem;

    a { border-bottom: 4px solid $color-lemon; }

    @include mobile {
      font-size: 3rem;
    }

    @include laptop {
      grid-column: 1 / 3; 
    }
  }
}

.sorting-nav {
  margin-bottom: 2rem;

  @include laptop { 
    text-align: right; 
    grid-column: 3 / 5; 
  }
  
  &__option {
    display: block;
    border: 1px solid $color-gray-light;
    padding: 0.25rem 0.5rem;
    width: max-content;
    text-align: center;
    margin: 0.25rem 0;

    @include laptop {
      display: inline-block;
      margin-left: 1rem;
      &:hover { border-color: $color-gray-dark; }
    }
  }
}

</style>
