// Filename: models/project

define([
  'backbone',
  'app/models/restaurant'
], function(Backbone, RestaurantModel){
  
  var RestaurantsCollection = Backbone.Collection.extend({
    model: RestaurantModel
  });

  RestaurantsCollection.prototype.url = '/restaurants';

  return RestaurantsCollection;
});
