exports.handler = async (event, context) => {
  const submission = queryStringParameters.submission
  const { PASSWORD } = process.env;

  if (submission === PASSWORD) {
    return {
      statusCode: 200,
      body: {
        authenticated: true
      }
    }
  } else {
    return {
      statusCode: 200,
      body: {
        authenticated: false
      }
    }
  }
}
