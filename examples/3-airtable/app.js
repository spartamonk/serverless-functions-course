const result = document.querySelector('.result')

const fetch =async() => {
 try {
const {data} = await axios.get('/api/3-airtable');
const products= data.map(i=> {
 const {id, name, url, price} = i;
 return ` <a href='./product?id=${id}' class="product">
      <img
        src=${url}
        alt=${name}
      />
      <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${price}</h5>
      </div>
    </a>`
}).join('');
result.innerHTML = products
 }
 catch(error) {
  result.innerHTML= '<h4>There was an error</h4>'
console.log(error.response);
 }
}

fetch()