const result = document.querySelector('.result')

const fetch = async () => {
  try {
    const { data } = await axios('/api/2-basic-api')
    const products = data.map((i) => {
      const {
        image: { url },
        name,
        id,
        price,
      } = i
      return ` <article  key==${id} class="product">
      <img
        src=${url}
        alt=${name}
      />
      <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${price}</h5>
      </div>
    </article>`
    }).join('')
result.innerHTML=products
  } catch (error) {
    result.innerHTML = `<h4>there was an error, please try again later</h4>`
    console.log(error.response)
  }
}
fetch()
