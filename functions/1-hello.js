// domain/.netlify/functions/1-hello
const person ={ 
 name: 'john'
}
exports.handler = async (event, context, cb) => {
  
  return {
    statusCode: 200,
    // body: JSON.stringify(person),
    body: 'Our First Netlify Function'
  }
}

// event this will have useful information about the incoming request
//  context: explains the context where the function is running

// alternate function approach with callback function

// exports.handler=(event, context, cb) => {

//  cb(null,
//   {
//    statusCode: 200,
//    body: 'Hello World!'
//   }
//   )
// }
