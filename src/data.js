import { weatherIcons3D, hourlyIcons, dailyIcons } from './icons';
import { initializeTemperatureToggle, updateTemperatures } from './temperature';

const input = document.getElementById('search')
const search = document.querySelector('.search-icon')
const preloadedLocation = 'New York'

input.value = preloadedLocation

export async function getData() {
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
    const weatherResponse = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=ZFE55KN2Q8RRM54T9WD4CJ7XD`, { mode: 'cors' });
    const hourlyResponses = [
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}06:00:00?key=ZFE55KN2Q8RRM54T9WD4CJ7XD&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}08:00:00?key=ZFE55KN2Q8RRM54T9WD4CJ7XD&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}10:00:00?key=ZFE55KN2Q8RRM54T9WD4CJ7XD&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}12:00:00?key=ZFE55KN2Q8RRM54T9WD4CJ7XD&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}14:00:00?key=ZFE55KN2Q8RRM54T9WD4CJ7XD&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}16:00:00?key=ZFE55KN2Q8RRM54T9WD4CJ7XD&include=current`, { mode: 'cors' }),
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${formattedDate}18:00:00?key=ZFE55KN2Q8RRM54T9WD4CJ7XD&include=current`, { mode: 'cors' }),
    ];
    

    const [weatherData, ...hourlyData] = await Promise.all([
      weatherResponse.then((res) => res.json()),
      ...hourlyResponses.map((res) => res.then((response) => response.json())),
    ]);

    // Update main weather section
    document.getElementById('temp').textContent = `${weatherData.currentConditions.temp}° F`;
    document.getElementById('location').textContent = weatherData.resolvedAddress;
    document.getElementById('conditions').textContent = weatherData.currentConditions.conditions;
    document.getElementById('description').textContent = weatherData.description;
    
    const mainWeatherIcon = weatherIcons3D[weatherData.currentConditions.icon];
    document.getElementById('main-weather-icon').src = mainWeatherIcon;
    

    // Update hourly forecast
    const hourlyTempIds = ['6-am-temp', '8-am-temp', '10-am-temp', '12-pm-temp', '2-pm-temp', '4-pm-temp', '6-pm-temp'];
    const hourlyIconIds = ['6-am-icon', '8-am-icon', '10-am-icon', '12-pm-icon', '2-pm-icon', '4-pm-icon', '6-pm-icon'];

    hourlyData.forEach((hourData, index) => {
      document.getElementById(hourlyTempIds[index]).textContent = `${hourData.currentConditions.temp}° F`;
      const hourlyIcon = hourlyIcons[hourData.currentConditions.icon];
      document.getElementById(hourlyIconIds[index]).src = hourlyIcon;    
    });

    // Update air conditions
    document.getElementById('humidity').textContent = `${weatherData.currentConditions.humidity}%`;
    weatherData.currentConditions.windgust === null ? document.getElementById('wind-gust').textContent = 'N/A' : document.getElementById('wind-gust').textContent = `${weatherData.currentConditions.windgust} mph`
    document.getElementById('wind-speed').textContent = `${weatherData.currentConditions.windspeed} mph`;
    document.getElementById('wind-direction').textContent = `${weatherData.currentConditions.winddir}°`;

    // Update 10-day forecast
    const dayTempIds = ['day-1', 'day-2', 'day-3', 'day-4', 'day-5', 'day-6', 'day-7', 'day-8', 'day-9', 'day-10'];
    const dayTempDetailsIds = ['day-1-temp', 'day-2-temp', 'day-3-temp', 'day-4-temp', 'day-5-temp', 'day-6-temp', 'day-7-temp', 'day-8-temp', 'day-9-temp', 'day-10-temp'];
    const dayIconIds = ['day-1-icon', 'day-2-icon', 'day-3-icon', 'day-4-icon', 'day-5-icon', 'day-6-icon', 'day-7-icon', 'day-8-icon', 'day-9-icon', 'day-10-icon'];
    const dayConditionIds = ['day-1-conditions', 'day-2-conditions', 'day-3-conditions', 'day-4-conditions', 'day-5-conditions', 'day-6-conditions', 'day-7-conditions', 'day-8-conditions', 'day-9-conditions', 'day-10-conditions'];

    weatherData.days.slice(0, 10).forEach((dayData, index) => {
      document.getElementById(dayTempIds[index]).textContent = dayData.datetime;
      document.getElementById(dayTempDetailsIds[index]).textContent = `${dayData.temp}° F`;
      document.getElementById(dayConditionIds[index]).textContent = dayData.conditions;
      const dailyIcon = dailyIcons[dayData.icon];
      document.getElementById(dayIconIds[index]).src = dailyIcon;
    });

    initializeTemperatureToggle()

    document.body.classList.add('loaded');

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}