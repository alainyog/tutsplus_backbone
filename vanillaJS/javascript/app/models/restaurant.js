Gourmet.Models.Restaurant = Backbone.Model.extend({
  defaults : {
    name: null,
    postcode: null,
    rating: null
  }
});
  
Gourmet.Models.Restaurant.prototype.urlRoot = '/restaurants';

Gourmet.Models.Restaurant.prototype.validate = {
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



