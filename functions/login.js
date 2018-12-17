const { PASSWORD } = process.env;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: PASSWORD
  }
}
