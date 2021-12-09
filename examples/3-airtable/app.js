const result = document.querySelector('.result')

const fetch =async() => {
 try {
const {data} = await axios.get('/api/3-airtable');
const products= data.map(i=> {
 const {id, name, url, price} = i;
 return ` <article class="product">
      <img
        src=${url}
        alt=${name}
      />
      <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${name}</h5>
      </div>
    </article>`
}).join('');
result.innerHTML = products
 }
 catch(error) {
console.log(error.response);
 }
}

fetch()