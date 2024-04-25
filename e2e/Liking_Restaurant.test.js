/* eslint-disable */

const assert = require('assert');
const { title } = require('process');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
})

Scenario('Showing Empty Liked Restaurant', ({ I }) => {
  I.seeElement('#search-restaurant');
  I.see('There is no restaurant that you like', '.restaurant__not__found');
});

Scenario('Liking One Restaurant', async ({ I }) => {
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
});

Scenario('Searching Restaurant', async ({ I }) => {
  I.see('There is no restaurant that you like', '.restaurant__not__found');
  
  I.amOnPage('/#/restaurants');

  I.seeElement('.restaurant');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');

    titles.push((await I.grabTextFrom('.restaurant__title')));
    I.amOnPage('/#/restaurants');
  }
  
  I.amOnPage('/#/favorite');
  I.seeElement('#search-restaurant');

  const visibleFavoriteRestaurant = await I.grabNumberOfVisibleElements('.restaurant');
  assert.strictEqual(titles.length, visibleFavoriteRestaurant);

  const searchQuery = titles[1].substring(1,3);

  I.fillField('#search-restaurant', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurant = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedFavoriteRestaurant = await I.grabNumberOfVisibleElements('.restaurant');

  assert.strictEqual(matchingRestaurant.length, visibleSearchedFavoriteRestaurant);

  for (let i = 0; i < matchingRestaurant.length; i++) {
    const visibleTitle = await I.grabTextFrom(locate('.title').at(i + 1));
    assert.strictEqual(matchingRestaurant[i].slice(0, -2), visibleTitle);
  }
});
