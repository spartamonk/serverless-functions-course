require('dotenv').config();

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app6MHZMR6hoxAQAm')
  .table('products')


exports.handler= async(event, context, cb)=> {
 const { id } = event.multiValueQueryStringParameters
const product = await airtable.retrieve(id)

 if(id) {
  try {
   if(product.error) {
return {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  statusCode: 404,
  body: `No product with id: ${id}`,
}
   } return {
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
return {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  statusCode: 400,
  body: `Please provide id`,
}
 
 
}
