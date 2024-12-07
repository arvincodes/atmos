import './styles.css'

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

async function getData() {
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

    // Update hourly forecast
    const hourlyTempIds = ['6-am-temp', '8-am-temp', '10-am-temp', '12-pm-temp', '2-pm-temp', '4-pm-temp', '6-pm-temp'];
    hourlyData.forEach((hourData, index) => {
      document.getElementById(hourlyTempIds[index]).textContent = `${hourData.currentConditions.temp}°`;
    });

    // Update air conditions
    document.getElementById('humidity').textContent = weatherData.currentConditions.humidity;
    document.getElementById('wind-gust').textContent = weatherData.currentConditions.windgust;
    document.getElementById('wind-speed').textContent = weatherData.currentConditions.windspeed;
    document.getElementById('wind-direction').textContent = weatherData.currentConditions.winddir;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


search.addEventListener('click', () => {
  getData()
})

