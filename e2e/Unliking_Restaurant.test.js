/* eslint-disable */

const assert = require('assert');
const { title } = require('process');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
})

Scenario('Showing Empty Liked Restaurant', ({ I }) => {
  I.seeElement('#search-restaurant');
  I.see('There is no restaurant that you like', '.restaurant__not__found');
});

Scenario('Unliking One Restaurant', async ({ I }) => {
  I.see('There is no restaurant that you like', '.restaurant__not__found');
  
  I.amOnPage('/#/restaurants');

  I.seeElement('.restaurant');
  const firstRestaurant = locate('.restaurant').first();
  const firstRestaurantTitle = await I.grabTextFrom('.title');
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant');
  const favoriteRestaurantTitle = await I.grabTextFrom('.title');

  assert.strictEqual(firstRestaurantTitle, favoriteRestaurantTitle);

  I.click(firstRestaurant);
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.dontSeeElement('.restaurant');
});
