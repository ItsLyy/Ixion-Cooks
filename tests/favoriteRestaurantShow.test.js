/* eslint-disable no-undef */

import RestaurantShowPresenter from '../src/scripts/views/pages/restaurant/restaurant-show-presenter';
import RestaurantSearchView from '../src/scripts/views/pages/restaurant/restaurant-search-view';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new RestaurantSearchView();
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
    <div class="search-area">
      <div class="search-input-container">
          <input type="text" id="search-restaurant">
          <button type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
    <ul class="box-area">
      <li class="restaurant">
        <span class="restaurant__title">Restaurant Satu</span>
      </li>
    </ul>
    `;
  };

  beforeEach(() => {
    renderTemplate();
    setRestaurantSearchContainer();
  });

  describe('When no restaurants have been liked', () => {
    it('should render the information that no restaurant have been liked', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const presenter = new RestaurantShowPresenter({
        view,
        restaurants: favoriteRestaurants,
        restaurantsContainer: document.querySelector('.box-area'),
      });

      const restaurants = [];
      presenter._displayRestaurants(restaurants);

      expect(document.querySelectorAll('.restaurant__not__found').length).toEqual(1);
    });

    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      // eslint-disable-next-line
      new RestaurantShowPresenter({
        view,
        restaurants: favoriteRestaurants,
        restaurantsContainer: document.querySelector('.box-area'),
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.querySelector('.box-area').addEventListener('restaurant:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(2);

        done();
      });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 11,
            title: 'A',
            vote_average: 3,
            overview: 'Sebuah restaurant A',
          },
          {
            id: 22,
            title: 'B',
            vote_average: 4,
            overview: 'Sebuah restaurant B',
          },
        ]),
      };

      // eslint-disable-next-line
      new RestaurantShowPresenter({
        view,
        restaurants: favoriteRestaurants,
        restaurantsContainer: document.querySelector('.box-area'),
      });
    });
  });
});
