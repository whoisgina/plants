<template>
  <div id="plant-card" class="plant-card">
    <div class="plant-card__name">
      {{ plant.fields.Name }}
    </div>
    <div class="plant-card__species">
      {{ species.find(x => x.id === plant.fields.Species[0]).fields.Species }}
    </div>
    <div v-for="(photo, index) in plant.fields.Photo"
         :key="index">
      <img class="plant-card__image" :src="photo.thumbnails.large.url" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlantCard',
  props: [
    'plant', 
    'species'
  ]
}
</script>

<style lang="scss">

.plant-card {
  background: $color-gray-light;
  flex-wrap: wrap;
  margin: 1rem;
  padding: 1rem;
  width: 100%;

  @include tablet { width: 40%; }
  @include desktop { width: 20%; }

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
