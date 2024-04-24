import CONFIG from '../global/config';

class RestaurantDB {
  static async getAllRestaurants() {
    try {
      const response = await fetch(`${CONFIG.BASE_URL_RESTAURANT_API}/list`);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async detailsData(url) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL_RESTAURANT_API}/detail/${url}`);
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async searchRestaurant(query) {
    return (await this.getAllRestaurants())
      .filter((restaurant) => {
        const loweredCaseRestaurantName = restaurant.name.toLowerCase();
        const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestaurantName.indexOf(jammedQuery) !== -1;
      });
  }
}

export default RestaurantDB;
