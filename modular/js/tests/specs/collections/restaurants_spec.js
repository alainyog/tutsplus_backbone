define( 
  
  // dependencies
  ['app/models/restaurant', 'app/collections/restaurants'], 
  
  function( RestaurantModel, RestaurantsCollection ) {
        
    return describe( "Restaurant Collection" , function() {
      var restaurants = new RestaurantsCollection;
      
      it( "should exist" , function() {
        expect( RestaurantsCollection ).toBeDefined();
      });
      
      it( "should use the Restaurant Model" , function() {
        expect( restaurants.model ).toEqual( RestaurantModel );
      });
      
      it( "should have the right url" , function() {
        expect( restaurants.url ).toEqual( '/restaurants' );
      });   
    });
  
  }
  
);