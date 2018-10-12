import axios from 'axios'
var appId = 'app0mdITu5g9AvhRY'
var appKey = 'keydSWGobTOzrvf1e'

export default() => {
  return axios.create({
    baseURL: 'https://api.airtable.com/v0/' + appId,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + appKey
    }
  })
}
