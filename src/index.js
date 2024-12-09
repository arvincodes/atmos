import './styles.css'
import { initializeTheme, enableDarkMode } from './theme';
import { getData } from './data';

const search = document.querySelector('.search-icon')
const searchInput = document.getElementById("search");

document.addEventListener("DOMContentLoaded", () => {
  enableDarkMode()
  initializeTheme()
  getData()
})

search.addEventListener('click', () => {
  getData()
})

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
      getData();
  }
});