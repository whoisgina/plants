<template>
  <div class="plant-card" @click="detailsShown = !detailsShown">
    <div :style="{visibility: !detailsShown ? 'visible' : 'hidden'}" class="plant-overview">
      <div class="plant-overview__info">
        <div class="plant-overview__name">
          {{ plant.fields.Name }}
        </div>
        <div class="plant-overview__species">
          {{ species.fields.Species }}
        </div>
        <input type="checkbox" :id="'plant-overview__healthy-' + index" class="plant-overview__healthy" v-model="isHealthy" @change="updateHealth()">
        <label :for="'plant-overview__healthy-' + index">Healthy</label>
      </div>
      <div class="plant-overview__image-container" v-for="(photo, index) in plant.fields.Photo"
          :key="index">
        <img class="plant-overview__image" :src="photo.thumbnails.large.url" />
      </div>
    </div>
    <div :style="{visibility: detailsShown ? 'visible' : 'hidden'}" class="plant-details">
      <div class="plant-details__name">
          {{ plant.fields.Name }}
      </div>
      <div class="plant-details__species">
        {{ species.fields.Species }}
      </div>
      <div class="plant-details__info">
        <h3 v-if="species.fields.Water" class="plant-details__heading">Water</h3>
        <p class="plant-details__paragraph">{{ species.fields.Water }}</p>
        <h3 v-if="species.fields.Light" class="plant-details__heading">Light</h3>
        <p class="plant-details__paragraph">{{ species.fields.Light }}</p>
        <h3 v-if="species.fields.Fertilizer" class="plant-details__heading">Fertilizer</h3>
        <p class="plant-details__paragraph">{{ species.fields.Fertilizer }}</p>
        <h3 v-if="species.fields.Mist" class="plant-details__heading">Mist</h3>
        <p class="plant-details__paragraph">{{ species.fields.Mist }}</p>
        <h3 v-if="species.fields.Notes" class="plant-details__heading">Notes</h3>
        <p class="plant-details__paragraph">{{ species.fields.Notes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Airtable from '@/services/Airtable'
export default {
  name: 'PlantCard',
  props: [
    'plant', 
    'index'
  ],
  computed: {
    species () {
      return this.plant.species
    }
  },
  data () {
    return {
      isHealthy: this.plant.fields.Healthy,
      detailsShown: false
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
  @include shadow;
  border: 1px solid $color-black;
  overflow: hidden;
  position: relative;
  max-width: 600px;
}

.plant-overview {
  &__info {
    padding: 1rem;
    background: $color-white;
  }

  &__name {
    font-weight: bold;
  }

  &__species { font-style: italic; }

  &__image-container {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
  }

  &__image {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
  }

  &__healthy {
    margin-left: 0;
  }
}

.plant-details {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background: $color-lemon;

  &__name {
    font-weight: bold;
  }

  &__species { 
    font-style: italic; 
  }

  &__info {
    margin-top: 1rem;
  }

  &__heading {
    font-weight: bold;
    margin-top: .5rem;
  }
}
</style>
