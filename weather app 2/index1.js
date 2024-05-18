const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById('city-input');
const formEl = document.querySelector("form");

async function getWeatherData(cityValue) {
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityValue}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '600bc702a0msh13c5c1baa8eb259p114e4ejsn960b357136d3',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        if (!result) {
            console.error("No data received from API");
            return;
        }

        const data = result.data;
        if (!data) {
            console.error("No weather data received from API");
            return;
        }

        const temperature = data.temp;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${data.feels_like}`,
            `Humidity: ${data.humidity}`,
            `Wind speed: ${data.wind_speed}`
        ];
        
        //weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`;
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="${icon}" alt="weather icon"/>`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}`;
        weatherDataEl.querySelector(".details").innerHTML = details.join("<br>");
}   catch (error) {
            console.error(error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

getWeatherData();
