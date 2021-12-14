require('dotenv').config();

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app6MHZMR6hoxAQAm')
  .table('survey')

exports.handler = async(event, context, cb) => {
const method = event.httpMethod;
if(method === 'GET') {
try {
  const { records } = await airtable.list()

  const items = records.map((i) => {
    const {
      id,
      fields: { room, votes },
    } = i
    return {
      id,
      room,
      votes,
    }
  })
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  }
} catch (error) {
  return {
    statusCode: 500,
    body: 'Server Error',
  }
}
}
  if(method === 'PUT') {
    try {
      const {id, votes} = JSON.parse(event.body);
      if(!id || !votes) {
        return {
          statusCode: 400,
          body: 'Please pass id and votes values'
        }
      }
      const fields = {votes: Number(votes) + 1}
      const item = await airtable.update(id, {fields});
      if(item.error) {
        return {
          statusCode: 400,
          body: JSON.stringify(item)
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      }
      
    } catch (error) {
      return {
        statusCode: 400,
        body: "Please pass id and vote values",
      }
    }
  }
  return {
    statusCode: 450,
    body: "Only 'GET' and 'PUT' reqests allowed"
  }
}

