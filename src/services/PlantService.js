import Airtable from '@/services/Airtable'

export default {
  getPlants () {
    return Airtable().get('/Studio%20plants')
  }
}
