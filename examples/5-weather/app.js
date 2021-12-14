// it takes few minutes

const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const alert = document.querySelector('.alert')
const result = document.querySelector('.result')
alert.style.display = 'none'


form.addEventListener('submit', e=> {
 e.preventDefault();
 const city= input.value;
 if(city) {
  fetchWeatherData(city)
 }
});

async function fetchWeatherData(city) {
 alert.style.display = 'none'
 try {
  const {data} = await axios.post('/api/5-weather', {city});
  const {main: {feels_like, temp_min, temp_max}, name, sys:{country}, weather}=data
  const desc = weather[0].description;
  result.innerHTML = `<article class="card">
  <h3>${name}, ${country}</h3>
  <p>${desc}<p>
  <p>min temp : ${temp_min}&#8457;</p>
    <p>max temp : ${temp_max}&#8457;</p>
      <p>feels like : ${feels_like}&#8457;</p>
  </article>`
 } catch (error) {
  console.log(error.response);
  alert.style.display = 'block'
  alert.textContent = `Can not find weather data for city : "${city}"`
 }
}
