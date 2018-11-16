<template>
  <section class="plant-grid">
    <plant-card v-for="(plant, index) in sortedPlants" 
                :plant="plant"
                :key="index" 
                :index="index"
                @watered="handleWatered"/>
  </section>
</template>

<script>
import PlantCard from '@/components/PlantCard.vue'

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
      return [...this.plants].reverse()
    }
  },

  methods: {
    handleWatered (e) {
      this.$emit('watered', e)
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
</style>
