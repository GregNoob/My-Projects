// Weather API
const apiKey = 'ba090421e9e5158d62e374da21b43928';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=berlin';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('weather-icon');

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);
    // update data after user input
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + ' %';
    document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';

    // update image after user input
    if(data.weather[0].main == 'Clouds'){
        weatherIcon.scr = "img/clouds.png";
    }
    else if (data.weather[0].main == 'Clear'){
        weatherIcon.scr = "img/clear.png";
    }
    else if (data.weather[0].main == 'Rain'){
        weatherIcon.scr = "img/rain.png";
    }
    else if (data.weather[0].main == 'Drizzle'){
        weatherIcon.scr = "img/drizzle.png";
    }
    else if (data.weather[0].main == 'Snow'){
        weatherIcon.scr = "img/snow.png";
    }
};

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

checkWeather();