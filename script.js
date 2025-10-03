document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherbtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temparature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  const API_KEY = "c096f1396e76bc63614534a528e1486b"; //env variables
  // jabhi bhi request daal rge to ye 2 baatei yaad rkhni h, time lag skta hai response aane mei.
  getWeatherbtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server\db is always in another country

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    return data;
  }
  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temparature.textContent = `Temperature : ${main.temp}`
    description.textContent = `Weather : ${weather[0].description}`

    //unlock display
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }
  function displayError() {
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.remove("hidden");
  }
});
