// Filename: models/project

define([
  'backbone.validations'
], function(Backbone){
  
  var RestaurantModel = Backbone.Model.extend({
    defaults : {
      name: null,
      postcode: null,
      rating: null
    }
  });

  RestaurantModel.prototype.urlRoot = '/restaurants';

  RestaurantModel.prototype.validate = {
    name: {
      required: true
    },
    postcode: {
      required: true
    },
    rating: {
      required: true,
      type: 'number',
      min: 1,
      max: 5
    }
  };

  return RestaurantModel;
});



