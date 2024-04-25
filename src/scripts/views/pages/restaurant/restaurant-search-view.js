import { createEmptyMessageForSearch, createRestaurantItemTemplate } from '../../templates/templates-creator';

class RestaurantSearchView {
  // eslint-disable-next-line
  runWhenUserIsSearching(callback) {
    document.querySelector('#search-restaurant').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  set restaurantsContainer(container) {
    this._restaurantsContainer = container;
  }

  async showRestaurant(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = createEmptyMessageForSearch();
    }
    this._restaurantsContainer.innerHTML = html;
    const allSkeleton = document.querySelectorAll('.skeleton');
    const allSkeletonText = document.querySelectorAll('.skeleton-text');
    allSkeleton.forEach((item) => {
      item.classList.remove('skeleton');
    });
    allSkeletonText.forEach((item) => {
      item.classList.remove('skeleton-text');
    });
    document.querySelector('.box-area').dispatchEvent(new Event('restaurant:searched:updated'));
  }
}

export default RestaurantSearchView;
