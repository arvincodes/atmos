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

  // Convert the main temperature
  if (mainTemp) {
    const currentValue = parseFloat(mainTemp.textContent);
    mainTemp.textContent = unit === 'C' 
      ? `${celsiusToFahrenheit(currentValue)}° F`
      : `${fahrenheitToCelsius(currentValue)}° C`;
  }

  // Convert hourly temperatures
  hourlyTemps.forEach(tempElem => {
    const currentValue = parseFloat(tempElem.textContent);
    tempElem.textContent = unit === 'C' 
      ? `${celsiusToFahrenheit(currentValue)}° F`
      : `${fahrenheitToCelsius(currentValue)}° C`;
  });

  // Convert daily temperatures
  dailyTemps.forEach(tempElem => {
    const currentValue = parseFloat(tempElem.textContent);
    tempElem.textContent = unit === 'C' 
      ? `${celsiusToFahrenheit(currentValue)}° F`
      : `${fahrenheitToCelsius(currentValue)}° C`;
  });

  // Update toggle button text
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