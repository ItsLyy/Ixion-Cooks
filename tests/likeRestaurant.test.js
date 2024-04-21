/* eslint-disable no-undef */
import FavoriteRestaurantDB from '../src/scripts/data/FavoriteIDB';
import * as TestFactories from './helpers/testFactories';

describe('Liking Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: '6u9lf7okjh9kfw1e867' });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should be able like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: '6u9lf7okjh9kfw1e867' });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantDB.getRestaurant('6u9lf7okjh9kfw1e867');
    expect(restaurant).toEqual({ id: '6u9lf7okjh9kfw1e867' });
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: '6u9lf7okjh9kfw1e867' });

    await FavoriteRestaurantDB.putRestaurant({ id: '6u9lf7okjh9kfw1e867' });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAllRestaurants()).not.toEqual([{ id: '6u9lf7okjh9kfw1e867' }]);
    await FavoriteRestaurantDB.deleteRestaurant('6u9lf7okjh9kfw1e867');
  });

  it('should not add a restaurant when there is no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });
});
