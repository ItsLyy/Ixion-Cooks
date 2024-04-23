import CONFIG from '../../global/config';

const createCategoryTemplate = (categories) => {
  let text = '';
  categories.forEach((categorie, index) => {
    if (index < categories.length - 1) {
      text += `${categorie.name}, `;
    } else {
      text += `${categorie.name}`;
    }
  });
  return text;
};

const createReviewTemplate = (customerReviews) => {
  let text = '';
  customerReviews.forEach((customerReview) => {
    text += `
      <div class="restaurant__review">
        <img src="images/profile_icon.png" class="review__profile" alt="profile-icon">
        <div>
          <div class="review__detail">
            <p class="review__name">${customerReview.name} |</p>
            <p class="review__date">${customerReview.date}</p>
          </div>
          <p class="review__content">${customerReview.review}</p>
        </div>
      </div>
    `;
  });

  return text;
};

const createMenusTemplate = (menus) => {
  let foods = '';
  let drinks = '';
  menus.foods.forEach((food) => {
    foods += `
      <li>${food.name}</li>
    `;
  });
  menus.drinks.forEach((drink) => {
    drinks += `
      <li>${drink.name}</li>
    `;
  });

  return { foods, drinks };
};

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="details__container">
    <img src="${CONFIG.IMG_LARGE_RES_URL_RESTAURANT_API}${restaurant.pictureId}" 
    alt="${restaurant.name}" class="restaurant__banner">
    <div class="restaurant__information">
      <div class="restaurant__status">
        <p class="restaurant__rating"><i class="fa-regular fa-star-half-stroke"></i> ${restaurant.rating}</p>
        <p class="restaurant__location">${restaurant.address}, ${restaurant.city} <i class="fa-solid fa-location-dot"></i></p>
      </div>
      <div class="restaurant__title-area">
        <h2 class="restaurant__title">${restaurant.name} |</h2>
        <p class="restaurant__categories">${createCategoryTemplate(restaurant.categories)}</p>
      </div>
      <p class="restaurant__description">${restaurant.description}</p>
      <div class="restaurant__menu">
        <div class="restaurant__menu__items">
          <h3>Menu Makanan</h3>
          <ul>
            ${createMenusTemplate(restaurant.menus).foods}
          </ul>
        </div>
        <div class="restaurant__menu__items">
          <h3>Menu Minuman</h3>
          <ul>
            ${createMenusTemplate(restaurant.menus).drinks}
          </ul>
        </div>
      </div>
      </div>
      <div id="review">
        <h3>Comment</h3>
        ${createReviewTemplate(restaurant.customerReviews)}
      </div>
  </div>
  `;

const createRestaurantItemTemplate = (restaurant) => `
  <a href="#/details/${restaurant.id}" class="box restaurant">
    <div class="top-area">
      <img
        src="${CONFIG.IMG_LARGE_RES_URL_RESTAURANT_API}${restaurant.pictureId}"
        alt="${restaurant.name}"
      />
    </div>
  <div class="bottom-area">
    <div class="detail">
      <p class="rating"><i class="fa-regular fa-star-half-stroke"></i> ${restaurant.rating}</p>
      <p class="location">${restaurant.city} <i class="fa-solid fa-location-dot"></i></p>
    </div>
    <h2 class="title">${restaurant.name}</h2>
    <p class="desc">${restaurant.description}</p>
  </div>
</a>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createEmptyMessageForSearch = () => `
  <div class="restaurant__not__found">
    <h2></h2>
  </div>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createEmptyMessageForSearch,
};
