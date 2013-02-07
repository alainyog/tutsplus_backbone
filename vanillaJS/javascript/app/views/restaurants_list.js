Gourmet.Views.RestaurantsList = Backbone.View.extend( {} );

Gourmet.Views.RestaurantsList.prototype.events = {
  'click #save': 'save'
};

Gourmet.Views.RestaurantsList.prototype.template = Hogan.compile($('#restaurant-template').html());

Gourmet.Views.RestaurantsList.prototype.events = {
  'click .remove': 'removeRestaurant'
};

Gourmet.Views.RestaurantsList.prototype.initialize = function() {
  
    _.bindAll(this);
      
    this.render(this.collection);
    this.collection.on('add', this.render);
    return this.collection.on('remove', this.render);
};

Gourmet.Views.RestaurantsList.prototype.render = function(  ) {
  
  var oSelf = this,
      nIndex = 0,
      aResults = [],
      aModels = this.collection.models,
      nNumModels = aModels.length,
      sCurrentRestaurant;
      
  this.$el.empty();
  
  for ( ; nIndex < nNumModels; nIndex++ ) {
    sCurrentRestaurant = aModels[nIndex];
    aResults.push((function(restaurant) {
      return oSelf.$el.append( oSelf.template.render( restaurant.toJSON() ) );
    })(sCurrentRestaurant));
  }
  
  return aResults;
};
      
Gourmet.Views.RestaurantsList.prototype.removeRestaurant = function( eEvent ) {
  var sId = eEvent.target.id, 
      oModel = this.collection.get(sId);
  
  this.collection.remove(oModel);
  return oModel.destroy();
};
