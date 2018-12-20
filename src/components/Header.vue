<template>
  <header id="app-header" class="app-header">
    <nav class="app-header__main-nav">
      <a class="app-header__main-nav__item" @click="toggleHeaderTab('info')">Info</a>
      <a v-if="!loggedIn" class="app-header__main-nav__item" @click="toggleHeaderTab('login')">Log In</a>
    </nav>

    <div v-if="!loggedIn && activeTab === 'login'" class="app-header__login">
      Wanna water? Enter the ~* secret code *~ here.
      <form class="login-form" v-on:submit.prevent="triggerAuthenticate(submittedPassword)">
        <input class="login-form__password" type="password" v-model="submittedPassword"/>
        <input class="login-form__submit" type="submit" value="Go!"/>
      </form>
    </div>

    <div v-if="activeTab === 'info'" class="app-header__about">
      <a class="app-header__logo" href="https://www.rumo.rs" target="_blank">♫</a>
      <p>
        These are the plants that live in our <a href="https://www.rumo.rs" target="_blank">studio</a> in Portland, Oregon! We built this tool to help us care for them. It’s free and open source, built using Vue.js on top of Airtable. <a href="#">Try it</a> yourself!
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  data () {
    return {
      submittedPassword: '',
      activeTab: ''
    }
  },

  props: {
    loggedIn: Boolean
  },

  methods: {
    triggerAuthenticate (submittedPassword) {
      this.$emit('authenticate', submittedPassword)
      this.submittedPassword = ''
    },

    toggleHeaderTab (tab) {
      if (this.activeTab === tab) {
        this.activeTab = ''
      } else {
        this.activeTab = tab
      }
    }
  }
}
</script>

<style lang="scss">
.app-header {
  background: $color-lemon;
  font-size: $type-size-medium;
  padding: 1rem 5%;

  &__main-nav {
    text-transform: uppercase;
    font-size: $type-size-small;
    &__item {
      &:not(:first-child) {
        margin-left: $space-medium;
      }
    }
  }
  
  &__about {
    margin-top: $space-large;
    max-width: 40ch;
    line-height: $type-leading-base;

  }

  &__login {
    margin-top: $space-large;

    input {
      margin: $space-small 0;
      font-family: $type-family-sans;
      height: 50px;
      border: 1px solid $color-black;
      padding: $space-small;
      margin-right: $space-small;
    }

    button {
      border: none;
    }
  }

  &__logo {
    display: block;
    font-size: $type-size-big;
    margin-bottom: $space-small;
  }

}
</style>
