export default {
  install (Vue, options = {}) {
    const apiOptions = {
      appId: options.appId,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + options.appKey
      }
    }
    
    const baseUrl = 'https://api.airtable.com/v0/'
    const apiUrl = baseUrl + apiOptions.appId + '/'

    Vue.prototype.$airtable = {
      getTable (tableName) {
        return fetch(apiUrl + tableName, {
          headers: apiOptions.headers
        }).then(response => response.json())
      },
      
      updateRecord (tableName, recordId, attributes = {}) {
        return fetch(apiUrl + tableName + '/' + recordId, {
          method: 'PATCH',
          headers: apiOptions.headers
        })
      }
    }
  }
}