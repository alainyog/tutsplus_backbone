// Filename: app.js
define([
  'app/collections/restaurants',
  'app/views/restaurants',
  'app/views/restaurant_form'
  
], function( RestaurantsCollection, RestaurantsView, RestaurantForm ){

  var restaurants_data = [
    {
      id: 0,
      name: 'Ritz',
      postcode: 'N112TP',
      rating: 5
    },
    {
      id: 1,
      name: 'Astoria',
      postcode: 'EC1E4R',
      rating: 3
    },
    {
      id: 2,
      name: 'Waldorf',
      postcode: 'WE43F2',
      rating: 4
    }
  ];

  var initialize = function(){

    restaurants = new RestaurantsCollection(restaurants_data);

    restaurants_view = new RestaurantsView({
      el: '#restaurants tbody',
      collection: restaurants
    })

    restaurant_form_view = new RestaurantForm({
      el: '#restaurant-form',
      collection: restaurants
    });

  }

  return {
    initialize: initialize
  };

});

