// Weather API
const apiKey = "Your API Key here";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  console.log(data);
  // Check if the API response contains valid data
  if (data.cod === 200) {
    // update data after user input
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // update image after user input
    const weatherConditions = {
      Clouds: "img/clouds.png",
      Clear: "img/clear.png",
      Rain: "img/rain.png",
      Drizzle: "img/drizzle.png",
      Snow: "img/snow.png"
    };

    const weatherMain = data.weather[0].main;
    weatherIcon.src = weatherConditions[weatherMain] || "img/clear.png";
  } else {
    // Handle the case when the API response is not successful
    console.error("Error fetching weather data:", data.message);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather(searchBox.value);
