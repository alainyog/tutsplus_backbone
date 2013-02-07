Gourmet.Views.RestaurantForm = Backbone.View.extend( {} );

Gourmet.Views.RestaurantForm.prototype.events = {
  'click #save': 'save'
};

Gourmet.Views.RestaurantForm.prototype.save = function() {
  var data = this.parseFormData( this.$el.serializeArray() ), 
      new_restaurant = new Gourmet.Models.Restaurant( data ),
      errors = new_restaurant.validate( new_restaurant.attributes );

  if ( errors ) {
    return this.handleErrors( errors );
  } 
  else {
    return this.collection.create( new_restaurant );
  }
};

Gourmet.Views.RestaurantForm.prototype.parseFormData = function( serialized_array ) {
  return _.reduce( serialized_array, this.parseFormField, {} );
};

Gourmet.Views.RestaurantForm.prototype.parseFormField = function( collector, field_obj ) {
  var name = field_obj.name.match( /\[(\w+)\]/ )[1];

  collector[name] = field_obj.value;
  return collector;
};

Gourmet.Views.RestaurantForm.prototype.handleErrors = function( errors ) {
  var nIndex = 0, 
      aKeys = _.keys(errors),
      nNumKeys = aKeys.length,
      aResults = [],
      sCurrentKey;
  
  $('.control-group').removeClass('error');

  for ( ; nIndex < nNumKeys; nIndex++ ) {
    sCurrentKey = aKeys[nIndex];
    aResults.push((function(sKey) {
      var oInput;
      oInput = $("#restaurant_" + sKey);
      return oInput.closest('.control-group').addClass('error');
    })(sCurrentKey));
  }
  
  return aResults;
};





