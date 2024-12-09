import './styles.css'
import { initializeTheme } from './theme';
import { getData } from './data';

const input = document.getElementById('search')
const search = document.querySelector('.search-icon')
const preloadedLocation = 'New York'

input.value = preloadedLocation

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  getData()
})

search.addEventListener('click', () => {
  getData()
})