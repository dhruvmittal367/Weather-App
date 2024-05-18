const apikey = "2b4d44e372b93a96e5d75b12790a7432"

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error('Network response was not ok')
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon //doubt how come icon? in weather
        const details = [
            `Feels like : ${data.main.feels_like}℃`,
            `Humidity : ${data.main.humidity}`,
            `Wind speed : ${data.wind.speed} m/s`

        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}℃`
        weatherDataEl.querySelector(".description").textContent = `${description}`
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");

        console.log(data)
    } catch (error) {
        
    }
}
