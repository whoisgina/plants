<template>
  <div id="app">
    <router-view :loggedIn="loggedIn" />
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      loggedIn: false
    }
  }
}
</script>

<style lang="scss">
</style>
