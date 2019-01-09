var Airtable = require('airtable')
var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.APP_ID)

var SEKRETS = process.env

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
      console.log(SEKRETS)
      var formattedResponse = {
        "records": response,
        "secrets": SEKRETS
    }

    return callback(null, { statusCode: 200, body: JSON.stringify(formattedResponse) });

    }
  })
}
