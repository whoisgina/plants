<template>
  <div :class="{ 'is-not-thirsty' : !isThirsty }"
       class="plant-card" 
       @click="detailsShown = !detailsShown">

    <div :style="{visibility: !detailsShown ? 'visible' : 'hidden'}" 
         class="plant-overview">
      <div class="plant-overview__image-container">
        <img class="plant-overview__image" :src="plant.fields.photo[0].thumbnails.large.url" />
        <button v-if="isThirsty && loggedIn" class="water-button" @click.stop="water">
          <svg width="19" height="25" viewBox="0 0 19 25" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3018 0.530775C9.75133 -0.176925 8.64967 -0.176925 8.10003 0.530775C5.66239 3.51884 0 11.0676 0 15.1566C0 20.2678 4.16836 24.3567 9.20089 24.3567C14.3121 24.3567 18.401 20.1891 18.401 15.1566C18.401 11.0676 12.7394 3.51884 10.3018 0.530775Z"/>
          </svg>
        </button>
        <span class="plant-overview__thirstiness plant-overview__thirstiness--thirsty" v-if="isThirsty">Thirsty!</span>
      </div>

    </div>

    <div class="plant-overview__name">
      {{ plant.fields.name }}
    </div>
    <div class="plant-overview__species">
      {{ species.fields.species }}
    </div>

    <div :style="{visibility: detailsShown ? 'visible' : 'hidden'}" 
         class="plant-details">
      <div class="plant-details__info">
        <span v-if="species.fields.light">
          <strong>Light:</strong>
          <span class="plant-details__sun" v-for="(sun, index) in species.fields.light" :key="`light-meter-active-${index}`">☀️</span>  
          <span class="plant-details__sun" v-for="(sun, index) in 5 - species.fields.light" :key="`light-meter-inactive-${index}`">•</span>
        </span>
        <span v-if="species.fields.mist"><strong>Mist:</strong> {{ species.fields.mist }}</span>

        <span v-if="plant.fields.notes"><strong>Notes:</strong> {{ plant.fields.notes }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PlantCard',
  props: {
    plant: Object,
    index: Number,
    loggedIn: Boolean
  },
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
  @include fade-in;
  position: relative;
  margin-bottom: 2rem;

  @include tablet {
    cursor: alias;
    margin-bottom: 0;
  }

  // &.is-not-thirsty { opacity: 0.6; }
}

.plant-overview {
  &__name {
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  &__species { 
    color: $color-gray-mid;
    margin-top: 0.5rem;
  }

  &__image-container {
    @include shadow-yellow;
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    
    .is-not-thirsty & {
      @include shadow-gray;
    }
  }

  &__image {
    border: 1px solid $color-gray-light;
    bottom: 0;
    display: block;
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }

  .water-button {
    background: $color-seafoam;
    border-radius: 100%;
    border: none;
    bottom: 1rem;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-size: 2rem;
    left: -1rem;
    margin-left: 0;
    outline: none;
    padding: 0.85rem 1.5rem;
    position: absolute;

    @include mobile {
      left: -3rem;
    }

    svg path { fill: white; }

    &:hover {
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
      cursor: url('~@/assets/images/can.png'), auto;
      transform: translateY(-3px);
    }
  }

  &__thirstiness {
    background: $color-lemon;
    color: $color-black;
    font-weight: bold;
    font-size: 0.75rem;
    margin-left: .5rem;
    padding: 0.25rem 0.45rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: max-content;
  }
}

.plant-details {
  @include shadow-gray; 
  background: $color-white;
  left: 0;
  padding: 1rem 1rem 95% 1rem;
  position: absolute;
  right: 0;
  top: 0;
  height: 0;
  border: 1px solid $color-gray-light;

  &__name {
    font-weight: bold;
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
