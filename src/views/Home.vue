<template>
  <div class="home">
    <plant-card v-for="(plant, index) in plantsWithSpecies" 
                :plant="plant"
                :key="index" 
                :index="index"/>
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

  computed: {
    plantsWithSpecies () {
      if (this.plants.length === 0 || this.species.length === 0) {
        return []
      } else {
        return this.plants.map(p => {
          let currentSpecies = this.species.find(s => s.id === p.fields.species[0])
          console.log(currentSpecies)
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
</style>
