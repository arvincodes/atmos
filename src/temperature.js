const search = document.querySelector('.search-icon')
const searchInput = document.getElementById("search");
const unitToggle = document.getElementById('unit-toggle');
let currentUnit = 'C';

export function fahrenheitToCelsius(f) {
  return ((f - 32) * 5 / 9).toFixed(1); 
}

export function celsiusToFahrenheit(c) {
  return ((c * 9 / 5) + 32).toFixed(1);
}

export function updateTemperatures(unit) {
  const mainTemp = document.getElementById('temp');
  const hourlyTemps = document.querySelectorAll('[id$="-temp"]');
  const dailyTemps = document.querySelectorAll('[id^="day"][id$="-temp"]');

  if (mainTemp) {
    const currentValue = parseFloat(mainTemp.textContent);
    mainTemp.textContent = unit === 'C' 
      ? `${celsiusToFahrenheit(currentValue)}° F`
      : `${fahrenheitToCelsius(currentValue)}° C`;
  }

  hourlyTemps.forEach(tempElem => {
    const currentValue = parseFloat(tempElem.textContent);
    tempElem.textContent = unit === 'C' 
      ? `${celsiusToFahrenheit(currentValue)}° F`
      : `${fahrenheitToCelsius(currentValue)}° C`;
  });

  dailyTemps.forEach(tempElem => {
    const currentValue = parseFloat(tempElem.textContent);
    tempElem.textContent = unit === 'C' 
      ? `${celsiusToFahrenheit(currentValue)}° F`
      : `${fahrenheitToCelsius(currentValue)}° C`;
  });

  unitToggle.textContent = unit === 'C' ? '°F' : '°C';
}

export const initializeTemperatureToggle = () => {
  unitToggle.addEventListener('click', () => {
    currentUnit = currentUnit === 'F' ? 'C' : 'F';
    updateTemperatures(currentUnit);
  });
};

search.addEventListener('click', () => {
  currentUnit = 'C'
  initializeTemperatureToggle()
})

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    currentUnit = 'C'
    initializeTemperatureToggle()
  }
});