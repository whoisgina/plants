var Airtable = require('airtable')
var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.APP_ID)

exports.handler = function(event, context, callback) {
  
  const table = event.queryStringParameters.table
  var response = []

  base(table).select({
    // Query options
  }).eachPage(function page(records, fetchNextPage) {

    records.forEach(function(record) {
      response.push(record._rawJson)
    })

    fetchNextPage();

  }, function done(err) {

    if (err) { 
      console.error(err); return; 
    } else {
      console.log('success')
      var formattedResponse = {
        "records": response
    }

    return callback(null, { statusCode: 200, body: JSON.stringify(formattedResponse) });

    }
  })
}
