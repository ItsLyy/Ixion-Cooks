import { createEmptyMessageForSearch, createRestaurantItemTemplate } from '../views/templates/templates-creator';

class SearchRestaurantPresenter {
  constructor({ input, restaurants, restaurantsContainer }) {
    this._input = input;
    this._restaurants = restaurants;
    this._restaurantsContainer = restaurantsContainer;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._input.addEventListener('change', (event) => {
      this._searchRestaurant(event.target.value);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurant;
    if (this.latestQuery.length > 0) {
      foundRestaurant = await this._restaurants.searchRestaurant(this.latestQuery);
    } else {
      foundRestaurant = await this._restaurants.getAllRestaurants();
    }
    this._showRestaurantFound(foundRestaurant);
  }

  _showRestaurantFound(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = createEmptyMessageForSearch();
    }
    this._restaurantsContainer.innerHTML = html;
    document.querySelector('.box-area').dispatchEvent(new Event('restaurant:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default SearchRestaurantPresenter;
