class RestaurantShowPresenter {
  constructor({ view, restaurants, restaurantsContainer }) {
    this._view = view;
    this._restaurants = restaurants;
    this._restaurantsContainer = restaurantsContainer;

    this._view.restaurantsContainer = this._restaurantsContainer;
    this._showRestaurants();
  }

  async _showRestaurants() {
    const restaurant = await this._restaurants.getAllRestaurants();
    this._displayRestaurants(restaurant);
  }

  _displayRestaurants(restaurants) {
    this._view.showRestaurant(restaurants);
  }
}

export default RestaurantShowPresenter;
