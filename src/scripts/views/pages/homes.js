import RestaurantDB from '../../data/RestaurantDB';
import { createRestaurantItemTemplate } from '../templates/templates-creator';

const Homes = {
  async render() {
    return `
    <style>
      #restaurant{
        display: flex;
        align-items: center;
        
        height: 700px;
        position: relative;
        flex-direction: column;
      }
      #restaurant .container .box-area::after{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(0, rgb(237, 237, 237) 1%, rgba(0, 0, 0, 0) 10%);
      }
    
    
      #restaurant .container .box-area::before{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(180deg, rgb(237, 237, 237) 1%, rgba(0, 0, 0, 0) 10%);
      }

      #restaurant .container .box-area{
        max-width: 70rem;
        height: fit-content;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    
        padding: 1rem 0 3rem;
        overflow: hidden;
      }

      @media (max-width: 1300px) {
        #restaurant{
          height: 630px;
        }
      }

      @media (max-width: 1200px) {
        #restaurant{
          height: 565px;
        }
      }

      @media (max-width: 900px) {
        #restaurant{
          height: 570px;
        }
      }

      @media (max-width: 700px) {
        #restaurant{
          height: 590px;
        }
      }

      </style>
      <article id="about">
        <div class="about__container">
          <div class="about__banner">
            <img data-src="https://www.fluentu.com/blog/english/wp-content/uploads/sites/4/2018/02/talking-about-food-in-english.jpg" class="lazyload" alt="about-banner" images>
          </div>
          <div id="about__content">
            <h2 class="about__title" tabindex="0">About This Website</h2>
            <p class="about__desc">This website contain list of the restaurant. Each restaurant have a unique description and have a rating. If you want go to the restaurant that you seem interesting, you can check the location on the description.</p>
          </div>
        </div>
      </article>
      <article id="restaurant">
        <div class="container">
          <h1 class="title-section">Restaurant</h1>
          <div class="box-area">
            
          </div>
          <a href="#/restaurants" class="restaurant__other-items">Other</a>
        </div>
      </article>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantDB.getAllRestaurants();
    const restaurantContainer = document.querySelector('.box-area');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(
        restaurants[i],
      );
    }
  },
};

export default Homes;
