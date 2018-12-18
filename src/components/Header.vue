<template>
  <header class="header">
    <nav class="main-nav">
      <a class="main-nav__item" @click="toggleHeaderTab('info')">Info</a>
      <a v-if="!loggedIn" class="main-nav__item" @click="toggleHeaderTab('login')">Log In</a>
    </nav>

    <div v-if="!loggedIn && activeTab === 'login'" class="header__login">
      <form class="login-form" v-on:submit.prevent="triggerAuthenticate(submittedPassword)">
        <input class="login-form__password" v-model="submittedPassword"/>
        <input class="login-form__submit" type="submit"/>
      </form>
    </div>

    <div v-if="activeTab === 'info'" class="header__about">
      <a class="header__logo" href="https://www.rumo.rs">♫</a>
      <p>
        These are the plants that live in our <a href="https://www.rumo.rs">studio</a> in Portland, Oregon! We built this tool to help us care for them. It’s free and open source, built using Vue.js on top of Airtable. <a href="#">Try it</a> yourself!
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
.header {
  background: $color-lemon;
  font-size: $type-size-medium;
  padding: 1.5rem;

  &__about {
    margin-top: $space-large;
    max-width: 30rem;
  }

  &__login {
    margin-top: $space-large;
  }

  &__logo {
    display: block;
    font-size: $type-size-big;
    margin-bottom: $space-small;
  }
}

.main-nav {
  &__item {
    &:not(:first-child) {
      margin-left: $space-small;
    }
  }
}
</style>
