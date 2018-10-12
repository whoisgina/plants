<template>
  <div class="home">
    <plant-card v-for="(plant, index) in plants" 
                :plant="plant"
                :species="species"
                :key="index" />
  </div>
</template>

<script>
import PlantCard from '@/components/PlantCard.vue'
import PlantService from '@/services/PlantService'
import SpeciesService from '@/services/SpeciesService'

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
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  font-family: 'Styrene B';
}
</style>
