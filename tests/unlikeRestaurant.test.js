/* eslint-disable no-undef */
import FavoriteRestaurantDB from '../src/scripts/data/FavoriteIDB';
import * as TestFactories from './helpers/testFactories';

describe('Liking Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantDB.putRestaurant({ id: '6u9lf7okjh9kfw1e867' });
  });

  afterEach(async () => {
    await FavoriteRestaurantDB.deleteRestaurant('6u9lf7okjh9kfw1e867');
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: '6u9lf7okjh9kfw1e867' });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should no display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: '6u9lf7okjh9kfw1e867' });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: '6u9lf7okjh9kfw1e867' });

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: '6u9lf7okjh9kfw1e867' });

    await FavoriteRestaurantDB.deleteRestaurant('6u9lf7okjh9kfw1e867');

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });
});
