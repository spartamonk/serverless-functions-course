require('dotenv').config()

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app6MHZMR6hoxAQAm')
  .table('products')

exports.handler = async (event, context, cb) => {
  const { id } = event.multiValueQueryStringParameters
  const product = await airtable.retrieve(id)

  if (id) {
    try {
      if (product.error) {
        return {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 500,
        body: 'Server Error',
      }
    }
  }
 try {
   const { records } = await airtable.list()
   const products = records.map((i) => {
     const {
       id,
       fields: { name, image, price },
     } = i

     const url = image[0].url
     return { id, name, url, price }
   })
   return {
     headers: {
       'Access-Control-Allow-Origin': '*',
     },
     statusCode: 200,
     body: JSON.stringify(products),
   }
 } catch (error) {
   return {
     headers: {
       'Access-Control-Allow-Origin': '*',
     },
     statusCode: 500,
     body: 'Server Error',
   }
 }
}
