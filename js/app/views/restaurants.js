define([
  'underscore',
  'backbone',
  'hogan'
], function(_, Backbone, Hogan){

  var RestaurantsView = Backbone.View.extend({});

  RestaurantsView.prototype.template = Hogan.compile($('#restaurant-template').html());

  RestaurantsView.prototype.events = {
    'click .remove': 'removeRestaurant'
  };

  RestaurantsView.prototype.initialize = function() {

    _.bindAll(this, 'render');

    this.render(this.collection);
    this.collection.on('add', this.render);
    
    return this.collection.on('remove', this.render);
  };

  RestaurantsView.prototype.render = function() {
    var restaurant, _i, _len, _ref, _results,
      _this = this;
    this.$el.empty();
    _ref = this.collection.models;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      restaurant = _ref[_i];
      _results.push((function(restaurant) {
        return _this.$el.append(_this.template.render(restaurant.toJSON()));
      })(restaurant));
    }
    return _results;
  };

  RestaurantsView.prototype.removeRestaurant = function(evt) {
    var id, model;
    id = evt.target.id;
    model = this.collection.get(id);
    this.collection.remove(model);
    return model.destroy();
  };

  return RestaurantsView;

});