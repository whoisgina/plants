const fetch =  require('node-fetch');

const API_ENDPOINT =
  "https://api.airtable.com/v0/app0mdITu5g9AvhRY/Studio%20plants";

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.API_KEY
    }
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.records
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};