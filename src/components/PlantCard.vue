<template>
  <div id="plant-card" class="plant-card">
    <div class="plant-card__name">
      {{ plant.fields.Name }}
    </div>
    <div class="plant-card__species">
      {{ species.find(x => x.id === plant.fields.Species[0]).fields.Species }}
    </div>
    <input type="checkbox" id="plant-card__healthy" class="plant-card__healthy" v-model="isHealthy" @change="updateHealth()">
    <label for="plant-card__healthy">Healthy</label>
    <div v-for="(photo, index) in plant.fields.Photo"
         :key="index">
      <img class="plant-card__image" :src="photo.thumbnails.large.url" />
    </div>
  </div>
</template>

<script>
import Airtable from '@/services/Airtable'
export default {
  name: 'PlantCard',
  props: [
    'plant', 
    'species'
  ],
  data () {
    return {
      isHealthy: this.plant.fields.Healthy
    }
  },
  methods: {
    updateHealth: function () {
      Airtable().patch('https://api.airtable.com/v0/app0mdITu5g9AvhRY/Studio%20plants/' + this.plant.id, {
        'fields': {
          'Healthy': this.isHealthy
        }
      })
    }
  }
}
</script>

<style lang="scss">
.plant-card {
  background: #e0e0e0;
  flex-wrap: wrap;
  margin: 1rem;
  padding: 1rem;
  width: 20%;

  &__name {
    font-weight: bold;
  }

  &__image {
    height: 200px;
    object-fit: cover;
    width: 200px;
  }
}
</style>
