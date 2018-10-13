<template>
  <div id="plant-card" class="plant-card">
    <div v-for="(photo, index) in plant.fields.Photo"
         :key="index">
      <img class="plant-card__image" :src="photo.thumbnails.large.url" />
    </div>

    <div class="plant-card__info">

      <div class="plant-card__name">
        {{ plant.fields.Name }}
      </div>
      <div class="plant-card__species">
        {{ species.find(x => x.id === plant.fields.Species[0]).fields.Species }}
      </div>
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
  @include shadow;
  border: 1px solid $color-black;
  overflow: hidden;
  position: relative;
  max-width: 400px;

  &__info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: $color-white;
  }

  &__name {
    font-weight: bold;
  }

  &__species { font-style: italic; }

  &__image {
    height: 400px;
    object-fit: cover;
    width: 400px;
  }
}
</style>
