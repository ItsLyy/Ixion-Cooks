import CONFIG from '../global/config';

class RestaurantDB {
  static async allData() {
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
}

export default RestaurantDB;
