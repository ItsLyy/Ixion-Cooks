import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import RestaurantDB from '../data/RestaurantDB';
import searchRestaurantInitiator from '../utils/search-restaurant-iniator';

class App {
  constructor({ content, searchInput }) {
    this._content = content;
    this._searchInput = searchInput;
  }

  async _initialAppShell() {
    searchRestaurantInitiator.init({
      input: this._searchInput,
      restaurants: RestaurantDB.allData(),
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const allSkeleton = document.querySelectorAll('.skeleton');
    allSkeleton.forEach((item) => {
      item.classList.remove('skeleton');
    });
  }
}

export default App;
