<template>
  <div id="plant-card" class="plant-card">
    <div class="plant-card__name">
      {{ plant.fields.Name }}
    </div>

    <div v-for="(photo, index) in plant.fields.Photo"
         :key="index">
      <img class="plant-card__image" :src="photo.url" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlantCard',
  props: ['plant']
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
