var Airtable = require('airtable')
var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.APP_ID)

exports.handler = function(event, context, callback) {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const recordId = JSON.parse(event.body).recordId
  const fields = JSON.parse(event.body).fields

  base('Plants').update(recordId, fields, function done(err, record) {

    if (err) { 
      console.error(err); return; 
    }

    return callback( null, { statusCode: 200, body: JSON.stringify(record) })

  })
}
