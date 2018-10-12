<template>
  <div class="home">
    <plant-card v-for="(plant) in plants" 
                :key="plant" />
  </div>
</template>

<script>
import PlantCard from '@/components/PlantCard.vue'
import PlantService from '@/services/PlantService'

export default {
  name: 'home',
  components: {
    PlantCard
  },

  data () {
    return {
      plants: []
    }
  },

  mounted () {
    this.getPlants()
  },

  methods: {
    async getPlants () {
      const response = await PlantService.getPlants()
      this.plants = response.data.records
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
