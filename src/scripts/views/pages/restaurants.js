import RestaurantDB from '../../data/RestaurantDB';
import RestaurantSearchView from './restaurant/restaurant-search-view';
import SearchRestaurantPresenter from './restaurant/restaurant-search-presenter';
import RestaurantShowPresenter from './restaurant/restaurant-show-presenter';

const Restaurants = {
  async render() {
    return `
    <style>
    #restaurant .container .restaurant__title-area{
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    #restaurant{
      display: flex;
      align-items: center;
      
      height: fit-content;
      position: relative;
      flex-direction: column;
    }

    #restaurant .container .box-area{
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
  
      padding: 1rem 0 3rem;
      overflow: hidden;
    }

    @media (max-width: 600px) {
      #restaurant .container .restaurant__title-area{
        flex-direction: column;
        justify-content: unset;
        align-items: center;
      }

      search-bar .search-area{
        width: 24rem;
      }
    }

    </style>
    <article id="restaurant">
      <div class="container">
        <div class="restaurant__title-area">
          <h1 class="title-section">Restaurant</h1>
          <search-bar></search-bar>
        </div>
        <div class="box-area">
          
        </div>
      </div>
    </article>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('.box-area');
    // eslint-disable-next-line
    new SearchRestaurantPresenter({
      input: document.querySelector('#search-restaurant'),
      restaurants: RestaurantDB,
      restaurantsContainer: restaurantContainer,
      view: new RestaurantSearchView(),
    });

    // eslint-disable-next-line
    new RestaurantShowPresenter({
      view: new RestaurantSearchView(),
      restaurants: RestaurantDB,
      restaurantsContainer: restaurantContainer,
    });
  },
};

export default Restaurants;
