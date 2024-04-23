import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantDB = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putRestaurant(Restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!Restaurant.hasOwnProperty('id')) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return (await dbPromise).put(OBJECT_STORE_NAME, Restaurant);
  },

  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },

  // eslint-disable-next-line
  async searchRestaurant(query) {
  },
};

export default FavoriteRestaurantDB;
