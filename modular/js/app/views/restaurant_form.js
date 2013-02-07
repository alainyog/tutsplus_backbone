define([
  'underscore',
  'backbone',
  'app/models/restaurant'
], function(_, Backbone, RestaurantModel){

  var RestaurantForm = Backbone.View.extend({});

  RestaurantForm.prototype.events = {
      'click #save': 'save'
    };

  RestaurantForm.prototype.save = function() {
    var data, errors, new_restaurant;

    data = this.parseFormData(this.$el.serializeArray());
    new_restaurant = new RestaurantModel(data);
    
    errors = new_restaurant.validate(new_restaurant.attributes);

    if (errors) {
      return this.handleErrors(errors);
    } else {
      return this.collection.create(new_restaurant);
    }
  };

  RestaurantForm.prototype.parseFormData = function(serialized_array) {
    return _.reduce(serialized_array, this.parseFormField, {});
  };

  RestaurantForm.prototype.parseFormField = function(collector, field_obj) {
    var name;
    name = field_obj.name.match(/\[(\w+)\]/)[1];
    collector[name] = field_obj.value;
    return collector;
  };

  RestaurantForm.prototype.handleErrors = function(errors) {
    var key, _i, _len, _ref, _results;
    $('.control-group').removeClass('error');
    _ref = _.keys(errors);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      _results.push((function(key) {
        var input;
        input = $("#restaurant_" + key);
        return input.closest('.control-group').addClass('error');
      })(key));
    }
    return _results;
  };

  return RestaurantForm;

});



