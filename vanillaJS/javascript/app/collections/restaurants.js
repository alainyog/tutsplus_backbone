Gourmet.Collections.Restaurants = Backbone.Collection.extend({
    model: Gourmet.Models.Restaurant
  });

Gourmet.Collections.Restaurants.prototype.url = '/restaurants';
