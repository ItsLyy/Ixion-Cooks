import Homes from '../views/pages/homes';
import Detail from '../views/pages/details';
import Restaurants from '../views/pages/restaurants';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': Homes,
  '/home': Homes,
  '/restaurants': Restaurants,
  '/details/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
