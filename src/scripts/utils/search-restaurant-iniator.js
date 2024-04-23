import { createRestaurantItemTemplate } from '../views/templates/templates-creator';
import UrlParser from '../routes/url-parser';

const searchRestaurantInitiator = {
  async init({
    input, restaurants, container, page,
  }) {
    const url = UrlParser.parseActiveUrlWithCombiner();
    input.addEventListener('change', () => {
      restaurants.forEach((restaurant) => {
        if (input.value === restaurant.name) {
          // eslint-disable-next-line
          container.innerHTML = '';
          this._render(container, restaurant);
        }
      });
      if (input.value === '') {
        if (url === '/restaurant') {
          // eslint-disable-next-line
          container.innerHTML = '';
          page.afterRender();
        }
      }
    });
  },

  async _render(container, restaurant) {
    // eslint-disable-next-line
    container.innerHTML += await createRestaurantItemTemplate(restaurant);
  },
};

export default searchRestaurantInitiator;
