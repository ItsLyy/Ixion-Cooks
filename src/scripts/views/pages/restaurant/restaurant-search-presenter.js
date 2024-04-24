class SearchRestaurantPresenter {
  constructor({
    input,
    restaurants,
    restaurantsContainer,
    view,
  }) {
    this._input = input;
    this._restaurants = restaurants;
    this._restaurantsContainer = restaurantsContainer;
    this._view = view;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
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
    this._view.restaurantsContainer = this._restaurantsContainer;
    this._view.showRestaurant(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default SearchRestaurantPresenter;
