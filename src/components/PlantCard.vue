<template>
  <div id="plant-card" class="plant-card">
    <div class="plant-card__name">
      {{ item.fields.Name }}
    </div>

    <div v-for="(photo, index) in item.fields.Photo"
         :key="index">
      <img class="plant-card__image" :src="photo.url" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlantCard',
  props: ['item']
}
</script>

<style lang="scss">
.plant-card {
  background: #e0e0e0;
  width: 20%;
  margin: 1rem;
  padding: 1rem;
  flex-wrap: wrap;

  &__name {
    font-weight: bold;
  }

  &__image {
    width: 100%;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
}
</style>
