describe( "Restaurant Form", function() {
  
  jasmine.getFixtures().fixturesPath = 'javascript/spec/fixtures';
  
  beforeEach(function() {
    loadFixtures( 'restaurant_form.html' );
    this.invisible_form = $('#restaurant-form');
    this.restaurant_form = new Gourmet.Views.RestaurantForm({
      el: this.invisible_form,
      collection: new Gourmet.Collections.Restaurants
    });
  });
  
  it( "should be defined", function() {
    expect( Gourmet.Views.RestaurantForm ).toBeDefined();
  });
  
  it( "should have the right element", function() {
    expect( this.restaurant_form.$el ).toEqual( this.invisible_form );
  });
  
  it( "should have a collection", function() {
    expect( this.restaurant_form.collection ).toEqual( new Gourmet.Collections.Restaurants );
  });
  
  describe( "Form submit", function() {
    var invalidAttrs, validAttrs;
    validAttrs = {
      name: 'Panjab',
      postcode: '123456',
      rating: '5'
    };
    invalidAttrs = {
      name: '',
      postcode: '123456',
      rating: '5'
    };
    
    beforeEach( function() {
      this.server = sinon.fakeServer.create();
      this.serialized_data = [
        {
          name: 'restaurant[name]',
          value: 'Panjab'
        }, {
          name: 'restaurant[rating]',
          value: '5'
        }, {
          name: 'restaurant[postcode]',
          value: '123456'
        }
      ];
      spyOn( this.restaurant_form.$el, 'serializeArray' ).andReturn( this.serialized_data );
    });
    
    afterEach( function() {
      this.server.restore();
    });
    
    it( "should parse form data", function() {
      expect( this.restaurant_form.parseFormData( this.serialized_data ) ).toEqual( validAttrs );
    });
    
    it( "should add a restaurant when form data is valid", function() {
      spyOn( this.restaurant_form, 'parseFormData' ).andReturn( validAttrs );
      this.restaurant_form.save();
      expect( this.restaurant_form.collection.length ).toEqual( 1 );
    });
    
    it( "should not add a restaurant when form data is invalid", function() {
      spyOn( this.restaurant_form, 'parseFormData' ).andReturn( invalidAttrs );
      this.restaurant_form.save();
      expect( this.restaurant_form.collection.length ).toEqual( 0 );
    });
    
    it( "should send an ajax request to the server", function() {
      spyOn( this.restaurant_form, 'parseFormData' ).andReturn( validAttrs );
      this.restaurant_form.save();
      expect( this.server.requests.length ).toEqual( 1 );
      expect( this.server.requests[0].method ).toEqual( 'POST' );
      expect( this.server.requests[0].requestBody ).toEqual( JSON.stringify( validAttrs ) );
    });
    
    it("should show validation errors when data is invalid", function() {
      spyOn( this.restaurant_form, 'parseFormData' ).andReturn( invalidAttrs );
      this.restaurant_form.save();
      expect( $('.error', $(this.invisible_form)).length ).toEqual( 1 );
    });
  });

});
