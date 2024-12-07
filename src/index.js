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
    return
  }
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=GGPDY8W7BL5YRSP9HC7TSFZPT`, { mode: 'cors'})
  const weatherData = await response.json()
  
  const humidity = document.getElementById('humidity')
  humidity.textContent = weatherData.currentConditions.humidity
}

search.addEventListener('click', () => {
  getData()
})

