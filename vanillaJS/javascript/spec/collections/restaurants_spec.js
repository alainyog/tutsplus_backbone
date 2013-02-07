describe( "Restaurant Collection" , function() {
  
  var restaurants = new Gourmet.Collections.Restaurants ;
  
  it( "should exist" , function() {
    expect( Gourmet.Collections.Restaurants  ).toBeDefined();
  });
  
  it( "should use the Restaurant Model" , function() {
    expect( restaurants.model ).toEqual( Gourmet.Models.Restaurant );
  });
  
  it( "should have the right url" , function() {
    expect( restaurants.url ).toEqual( '/restaurants' );
  });
  
});