<template>
  <div class="plant-card" @click="detailsShown = !detailsShown">
    <div :style="{visibility: !detailsShown ? 'visible' : 'hidden'}" class="plant-overview">
      <div class="plant-overview__info">
        <div class="plant-overview__name">
          {{ plant.fields.name }}
        </div>
        <div class="plant-overview__species">
          {{ species.fields.species }}
        </div>
        <button class="thirstiness-button" @click.stop="water" :disabled="!isThirsty">Water</button>
        <span class="plant-overview__thirstiness" v-if="!isThirsty">{{daysUntilThirsty}} days until thirst</span>
        <span class="plant-overview__thirstiness plant-overview__thirstiness--thirsty" v-if="isThirsty">Thirsty!</span>
      </div>
      <div class="plant-overview__image-container" v-for="(photo, index) in plant.fields.photo"
          :key="index">
        <img class="plant-overview__image" :src="photo.thumbnails.large.url" />
      </div>
    </div>
    <div :style="{visibility: detailsShown ? 'visible' : 'hidden'}" class="plant-details">
      <div class="plant-details__name">
        {{ plant.fields.name }}
      </div>
      <div class="plant-details__species">
        {{ species.fields.species }}
      </div>
      <div class="plant-details__info">
        <span v-if="species.fields.light">
          <strong>Light:</strong>
          <span class="plant-details__sun" v-for="(sun, index) in species.fields.light" :key="index">☀</span>  
          <span class="plant-details__sun" v-for="(sun, index) in 5 - species.fields.light" :key="index">☉</span>
        </span>
        <span v-if="species.fields.mist"><strong>Mist:</strong> {{ species.fields.mist }}</span>
        <span v-if="species.fields.notes"><strong>Notes:</strong> {{ species.fields.notes }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PlantCard',
  props: [
    'plant', 
    'index'
  ],
  computed: {
    species () {
      return this.plant.species
    },
    lastWatered () {
      let lastWatered = moment(this.plant.fields.lastWatered, moment.ISO_8601)
      return lastWatered
    },
    nextWatered () {
      let nextWatered = moment(this.plant.fields.nextWatered, moment.ISO_8601)
      return nextWatered
    },
    daysUntilThirsty () {
      return this.nextWatered.diff(moment(), 'days')
    },
    isThirsty () {
      if (this.daysUntilThirsty <= 0) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      detailsShown: false
    }
  },
  methods: {
    water () {
      this.$emit('watered', this.plant)
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

  &__species { 
    font-style: italic; 
  }

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

  &__thirstiness-button {
    margin-left: 0;

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__thirstiness {
    color: $color-gray-dark;
    margin-left: .5rem;

    &--thirsty {
      color: $color-lime;
    }
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
  
  span {
    display: block;
    margin-top: 1rem;
  }
  
  span &__sun {
    display: inline-block;
    margin-left: .5rem;
  }

}
</style>
