<template>
  <div class="home">
    <div class="plant-card" v-for="(item, index) in items"
         :key="index">
      {{ item.fields.Name }}
      <div v-for="(photo, index) in item.fields.Photo"
           :key="index">
        <img class="plant-card__image" :src="photo.url" />
      </div>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.loadItems(); 
  },
  methods: {
    loadItems: function(){
        
        // Init variables
        var self = this
        var app_id = "app0mdITu5g9AvhRY";
        var app_key = "keydSWGobTOzrvf1e";
        this.items = []

    axios.get(
        "https://api.airtable.com/v0/"+app_id+"/Studio%20plants",
        { 
            headers: { Authorization: "Bearer "+app_key } 
        }
        ).then(function(response){
            self.items = response.data.records
        }).catch(function(error){
            console.log(error)
        })
    }
  }
}
</script>
