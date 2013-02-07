define( ['app/models/restaurant'], function( RestaurantModel ) {
  
  return describe( "Restaurant Model" , function() { 
    
    it( "should exist" , function() {
      expect( RestaurantModel ).toBeDefined();
    });
    
    describe( "Attributes" , function() {
      var ritz = new RestaurantModel;
      
      it( "should have default attributes" , function() {
        expect( ritz.attributes.name ).toBeDefined();
        expect( ritz.attributes.postcode ).toBeDefined();
        expect( ritz.attributes.rating ).toBeDefined();
      });
      
      it( "should have the right url" , function() {
        expect( ritz.urlRoot ).toEqual( '/restaurants' );
      });
    });
  
    describe("Validations", function() {
      var attrs = {};
      
      beforeEach( function() {
          attrs = {
            name: 'Ritz',
            postcode: 'N112TP',
            rating: 5
          };
      } );
      
      afterEach( function() {
          var ritz = new RestaurantModel( attrs );
          expect( ritz.isValid() ).toBeFalsy();
      } );
      
      it("should validate the presence of name", function() {
        attrs["name"] = null;
      });
      
      it("should validate the presence of postcode", function() {
        attrs["postcode"] = null;
      });
      
      it("should validate the presence of rating", function() {
        attrs["rating"] = null;
      });
      
      it("should validate the numericality of rating", function() {
        attrs["rating"] = 'foo';
      });
      
      it("should not accept a rating < 1", function() {
        attrs["rating"] = 0;
      });
      
      it("should not accept a rating > 5", function() {
        attrs["rating"] = 6;
      });
    });
    
  });
  
});