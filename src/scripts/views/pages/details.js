import RestaurantDB from '../../data/RestaurantDB';
import FavoriteRestaurantDB from '../../data/FavoriteIDB';
import likeButtonInitiator from '../../utils/like-button-initiator';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/templates-creator';

const Detail = {
  async render() {
    return `
      <article id="details">
      </article>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDB.detailsData(url.id);
    const restaurantContainer = document.querySelector('#details');

    likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantDB,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        city: restaurant.city,
        pictureId: restaurant.pictureId,
        address: restaurant.address,
        categories: restaurant.categories,
        menus: restaurant.menus,
        rating: restaurant.rating,
        customerReviews: restaurant.customerReviews,
      },
    });
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    const allSkeleton = document.querySelectorAll('.skeleton');
    const allSkeletonText = document.querySelectorAll('.skeleton-text');
    allSkeleton.forEach((item) => {
      item.classList.remove('skeleton');
    });
    allSkeletonText.forEach((item) => {
      item.classList.remove('skeleton-text');
    });
  },
};

export default Detail;
