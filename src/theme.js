let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

export const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
};

export const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
};

export const initializeTheme = () => {
  if (darkmode === 'active') enableDarkMode();

  themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? enableDarkMode() : disableDarkMode();
  });
};