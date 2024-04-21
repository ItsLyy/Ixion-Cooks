import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const therestaurantdbApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
  new StaleWhileRevalidate({
    cacheName: 'therestaurantdb-api',
  }),
);

const therestaurantdbImageApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/'),
  new StaleWhileRevalidate({
    cacheName: 'therestaurantdb-image-api',
  }),
);

registerRoute(therestaurantdbApi);
registerRoute(therestaurantdbImageApi);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

// eslint-disable-next-line no-unused-vars
self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');
});
