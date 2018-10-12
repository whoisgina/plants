import Airtable from '@/services/Airtable'

export default {
  getSpecies () {
    return Airtable().get('/Plant%20species')
  }
}
