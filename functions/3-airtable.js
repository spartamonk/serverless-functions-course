require('dotenv').config()
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app6MHZMR6hoxAQAm')
  .table('products')

exports.handler = async (event, context, cb) => {
 try {
const {records} = await airtable.list()
const products = records.map(i => {
 const {id, fields: {name, image, price}} = i;

const url = image[0].url
return {id, name, url, price}
})
 return {
   statusCode: 200,
   // body: JSON.stringify(person),
   body: JSON.stringify(products),
 }
 }
 catch(error) {
return {
  statusCode: 500,
  body: 'Server Error',
}
 }
 
}
