import './styles.css'

import snow from "./images/weather-statuses/2d-snow.svg"
import rain from "./images/weather-statuses/2d-rain.svg"
import partlyCloudyDay from "./images/weather-statuses/2d-partly-cloudy-day.svg"
import partlyCloudyNight from "./images/weather-statuses/2d-partly-cloudy-night.svg"
import fog from "./images/weather-statuses/2d-fog.svg"
import thunder from "./images/weather-statuses/2d-thunder.svg"
import clearDay from "./images/weather-statuses/2d-clear-day.svg"
import clearNight from "./images/weather-statuses/2d-clear-night.svg"
import wind from "./images/weather-statuses/2d-wind.svg"

import snowDay3D from "./images/weather-statuses/3d-day-snow.svg"
import snowNight3D from "./images/weather-statuses/3d-night-snow.svg"
import thunderDay3D from "./images/weather-statuses/3d-day-storm.svg"
import thunderNight3D from "./images/weather-statuses/3d-night-storm.svg"
import cloudsDay3D from "./images/weather-statuses/3d-day-clouds.svg"
import cloudsNight3D from "./images/weather-statuses/3d-night-clouds.svg"
import clearDay3D from "./images/weather-statuses/3d-day-sun.svg"
import clearNight3D from "./images/weather-statuses/3d-night-moon.svg"
import rainDay3D from "./images/weather-statuses/3d-day-rain.svg"
import rainNight3D from "./images/weather-statuses/3d-night-rain.svg"
import windDay3D from "./images/weather-statuses/3d-day-wind.svg"

let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkMode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if (darkmode === 'active') enableDarkMode()

themeSwitch.addEventListener('click', () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== 'active' ? enableDarkMode() : disableDarkMode()
})

const input = document.getElementById('search')
const search = document.querySelector('.search-icon')
const preloadedLocation = 'New York'

input.value = preloadedLocation

async function getData() {
  document.body.classList.remove('loaded');

  if (!input.value.trim()) {
    return;
  }

  const formattedDate = (() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T`;
  })();

  try {
    const weatherResponse = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=GGPDY8W7BL5YRSP9HC7TSFZPT`, { mode: 'cors' });
    const hourlyResponses = [
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}06:00:00?key=GGPDY8W7BL5YRSP9HC7TSFZPT&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}08:00:00?key=GGPDY8W7BL5YRSP9HC7TSFZPT&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}10:00:00?key=GGPDY8W7BL5YRSP9HC7TSFZPT&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}12:00:00?key=GGPDY8W7BL5YRSP9HC7TSFZPT&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}14:00:00?key=GGPDY8W7BL5YRSP9HC7TSFZPT&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}16:00:00?key=GGPDY8W7BL5YRSP9HC7TSFZPT&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}18:00:00?key=GGPDY8W7BL5YRSP9HC7TSFZPT&include=current`, { mode: 'cors' }),
    ];
    

    const [weatherData, ...hourlyData] = await Promise.all([
      weatherResponse.then((res) => res.json()),
      ...hourlyResponses.map((res) => res.then((response) => response.json())),
    ]);

    // Update main weather section
    document.getElementById('temp').textContent = `${weatherData.currentConditions.temp}°`;
    document.getElementById('location').textContent = weatherData.resolvedAddress;
    document.getElementById('conditions').textContent = weatherData.currentConditions.conditions;
    document.getElementById('description').textContent = weatherData.description;

    if (weatherData.currentConditions.icon === "snow" || weatherData.currentConditions.icon === "snow-showers-day") {
      document.getElementById('main-weather-icon').src = `${snowDay3D}`
    } else if (weatherData.currentConditions.icon === "snow-showers-night") {
      document.getElementById('main-weather-icon').src = `${snowNight3D}`
    } else if (weatherData.currentConditions.icon === "rain" || weatherData.currentConditions.icon === "showers-day") {
      document.getElementById('main-weather-icon').src = `${rainDay3D}`
    } else if (weatherData.currentConditions.icon === "showers-night") {
      document.getElementById('main-weather-icon').src = `${rainNight3D}`
    } else if (weatherData.currentConditions.icon === "partly-cloudy-day") {
      document.getElementById('main-weather-icon').src = `${cloudsDay3D}`
    } else if (weatherData.currentConditions.icon === "partly-cloudy-night") {
      document.getElementById('main-weather-icon').src = `${cloudsNight3D}`
    } else if (weatherData.currentConditions.icon === "cloudy" || weatherData.currentConditions.icon === "fog") {
      document.getElementById('main-weather-icon').src = `${cloudsDay3D}`
    } else if (weatherData.currentConditions.icon === "thunder-rain" || weatherData.currentConditions.icon === "thunder-showers-night") {
      document.getElementById('main-weather-icon').src = `${thunderNight3D}`
    } else if (weatherData.currentConditions.icon === "thunder-showers-day") {
      document.getElementById('main-weather-icon').src = `${thunderDay3D}`
    } else if (weatherData.currentConditions.icon === "clear-day") {
      document.getElementById('main-weather-icon').src = `${clearDay3D}`
    } else if (weatherData.currentConditions.icon === "clear-night") {
      document.getElementById('main-weather-icon').src = `${clearNight3D}`
    } else if (weatherData.currentConditions.icon === "wind") {
      document.getElementById('main-weather-icon').src = `${windDay3D}`
    }  

    // Update hourly forecast
    const hourlyTempIds = ['6-am-temp', '8-am-temp', '10-am-temp', '12-pm-temp', '2-pm-temp', '4-pm-temp', '6-pm-temp'];
    const hourlyIconIds = ['6-am-icon', '8-am-icon', '10-am-icon', '12-pm-icon', '2-pm-icon', '4-pm-icon', '6-pm-icon'];
    hourlyData.forEach((hourData, index) => {
      document.getElementById(hourlyTempIds[index]).textContent = `${hourData.currentConditions.temp}°`;

      if (hourData.currentConditions.icon === "snow" || hourData.currentConditions.icon === "snow-showers-day" || hourData.currentConditions.icon === "snow-showers-night") {
        document.getElementById(hourlyIconIds[index]).src = `${snow}`;
      } else if (hourData.currentConditions.icon === "rain" || hourData.currentConditions.icon === "showers-day" || hourData.currentConditions.icon === "showers-night") {
        document.getElementById(hourlyIconIds[index]).src = `${rain}`;
      } else if (hourData.currentConditions.icon === "partly-cloudy-day") {
        document.getElementById(hourlyIconIds[index]).src = `${partlyCloudyDay}`;
      } else if (hourData.currentConditions.icon === "partly-cloudy-night") {
        document.getElementById(hourlyIconIds[index]).src = `${partlyCloudyNight}`;
      } else if (hourData.currentConditions.icon === "cloudy" || hourData.currentConditions.icon === "fog") {
        document.getElementById(hourlyIconIds[index]).src = `${fog}`;
      } else if (hourData.currentConditions.icon === "thunder-rain" || hourData.currentConditions.icon === "thunder-showers-day" || hourData.currentConditions.icon === "thunder-showers-night") {
        document.getElementById(hourlyIconIds[index]).src = `${thunder}`;
      } else if (hourData.currentConditions.icon === "clear-day") {
        document.getElementById(hourlyIconIds[index]).src = `${clearDay}`;
      } else if (hourData.currentConditions.icon === "clear-night") {
        document.getElementById(hourlyIconIds[index]).src = `${clearNight}`;
      } else if (hourData.currentConditions.icon === "wind") {
        document.getElementById(hourlyIconIds[index]).src = `${wind}`;
      }      
    });

    // Update air conditions
    document.getElementById('humidity').textContent = weatherData.currentConditions.humidity;
    if (weatherData.currentConditions.windgust === null) {
      document.getElementById('wind-gust').textContent = 'N/A';
    } else {
      document.getElementById('wind-gust').textContent = weatherData.currentConditions.windgust;
    }
    document.getElementById('wind-speed').textContent = weatherData.currentConditions.windspeed;
    document.getElementById('wind-direction').textContent = weatherData.currentConditions.winddir;

    // Update 10-day forecast
    const dayTempIds = ['day-1', 'day-2', 'day-3', 'day-4', 'day-5', 'day-6', 'day-7', 'day-8', 'day-9', 'day-10'];
    const dayTempDetailsIds = ['day-1-temp', 'day-2-temp', 'day-3-temp', 'day-4-temp', 'day-5-temp', 'day-6-temp', 'day-7-temp', 'day-8-temp', 'day-9-temp', 'day-10-temp'];
    const dayIconIds = ['day-1-icon', 'day-2-icon', 'day-3-icon', 'day-4-icon', 'day-5-icon', 'day-6-icon', 'day-7-icon', 'day-8-icon', 'day-9-icon', 'day-10-icon'];
    const dayConditionIds = ['day-1-conditions', 'day-2-conditions', 'day-3-conditions', 'day-4-conditions', 'day-5-conditions', 'day-6-conditions', 'day-7-conditions', 'day-8-conditions', 'day-9-conditions', 'day-10-conditions'];

    weatherData.days.slice(0, 10).forEach((dayData, index) => {
      document.getElementById(dayTempIds[index]).textContent = dayData.datetime;
      document.getElementById(dayTempDetailsIds[index]).textContent = `${dayData.temp}°`;
      document.getElementById(dayConditionIds[index]).textContent = dayData.conditions;

      if (dayData.icon === "snow" || dayData.icon === "snow-showers-day" || dayData.icon === "snow-showers-night") {
        document.getElementById(dayIconIds[index]).src = `${snow}`
      } else if (dayData.icon === "rain" || dayData.icon === "showers-day" || dayData.icon === "showers-night") {
        document.getElementById(dayIconIds[index]).src = `${rain}`
      } else if (dayData.icon === "partly-cloudy-day") {
        document.getElementById(dayIconIds[index]).src = `${partlyCloudyDay}`
      } else if (dayData.icon === "partly-cloudy-night") {
        document.getElementById(dayIconIds[index]).src = `${partlyCloudyNight}`
      } else if (dayData.icon === "cloudy" || dayData.icon === "fog") {
        document.getElementById(dayIconIds[index]).src = `${fog}`
      } else if (dayData.icon === "thunder-rain" || dayData.icon === "thunder-showers-day" || dayData.icon === "thunder-showers-night") {
        document.getElementById(dayIconIds[index]).src = `${thunder}`
      } else if (dayData.icon === "clear-day") {
        document.getElementById(dayIconIds[index]).src = `${clearDay}`
      } else if (dayData.icon === "clear-night") {
        document.getElementById(dayIconIds[index]).src = `${clearNight}`
      } else if (dayData.icon === "wind") {
        document.getElementById(dayIconIds[index]).src = `${wind}`
      }
    });

    document.body.classList.add('loaded');

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getData()
})

search.addEventListener('click', () => {
  getData()
})