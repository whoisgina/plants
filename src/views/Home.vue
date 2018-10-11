<template>
  <div class="home">
    <plant-card v-for="(item, index) in items" 
                :item="item" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import PlantCard from '@/components/PlantCard.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld,
    PlantCard
  },

  data () {
    return {
      items: []
    }
  },

  mounted () {
    this.loadItems()
  },

  methods: {
    loadItems () {
      var self = this
      var appId = 'app0mdITu5g9AvhRY'
      var appKey = 'keydSWGobTOzrvf1e'
      this.items = []

      axios.get(
        'https://api.airtable.com/v0/' + appId + '/Studio%20plants',
        { 
          headers: { Authorization: 'Bearer ' + appKey }
        }
      ).then(function (response) {
        self.items = response.data.records
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  font-family: 'Styrene B';
}
</style>
