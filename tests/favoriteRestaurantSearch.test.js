/* eslint-disable no-undef */

import SearchRestaurantPresenter from '../src/scripts/views/pages/restaurant/restaurant-search-presenter';
import RestaurantSearchView from '../src/scripts/views/pages/restaurant/restaurant-search-view';

describe('Searching Restaurant', () => {
  let presenter;
  let favoriteRestaurants;

  const searchRestaurants = (query) => {
    const queryElement = document.querySelector('#search-restaurant');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      searchRestaurant: jest.fn(),
      getAllRestaurants: jest.fn(),
    };
    presenter = new SearchRestaurantPresenter({
      input: document.querySelector('#search-restaurant'),
      restaurants: favoriteRestaurants,
      restaurantsContainer: document.querySelector('.box-area'),
      view: new RestaurantSearchView(),
    });
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
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurant.mockImplementation(() => []);
      searchRestaurants('Restaurant A');

      expect(presenter.latestQuery).toEqual('Restaurant A');
    });

    it('should ask the model to search for restaurant', () => {
      favoriteRestaurants.searchRestaurant.mockImplementation(() => []);
      searchRestaurants('Restaurant A');

      expect(favoriteRestaurants.searchRestaurant).toHaveBeenCalledWith(
        'Restaurant A',
      );
    });

    it('Should show the found restaurant', (done) => {
      document
        .querySelector('.box-area')
        .addEventListener('restaurant:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3);
          done();
        });
      favoriteRestaurants.searchRestaurant.mockImplementation((query) => {
        if (query === 'Restaurant A') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchRestaurants('Restaurant A');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query is empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('     ');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all restaurant ', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('   ');

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('When no restaurant could be found', () => {
    it('Should show empty message', (done) => {
      document
        .querySelector('.box-area').addEventListener('restaurant:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant__not__found').length).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurant.mockImplementation(() => []);

      searchRestaurants('Mother Father');
    });

    it('Should not show any restaurant', (done) => {
      document
        .querySelector('.box-area').addEventListener('restaurant:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(0);
          done();
        });

      favoriteRestaurants.searchRestaurant.mockImplementation(() => []);

      searchRestaurants('Mother Father');
    });
  });
});
