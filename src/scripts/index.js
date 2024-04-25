import 'regenerator-runtime'; /* for async await transpile */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/style.css';

import './views/components/search-bar';
import navbarLogic from './utils/navbar';
import App from './views/app';
import swRegister from './utils/sw-register';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const app = new App({
  content: document.querySelector('#content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  navbarLogic();
  await swRegister();
  app.renderPage();
});

const skipLinkElem = document.querySelector('.skip-content');
skipLinkElem.addEventListener('click', () => {
  document.querySelector('#content').focus();
});
