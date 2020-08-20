const { PASSWORD } = process.env

export function handler (event, context, callback) {
  const submission = event.queryStringParameters.submission
  if (submission === PASSWORD) {
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: `authenticated`
    })
  } else {
    callback(null, {
      statusCode: 200,
      body: `declined`
    })
  }
}
