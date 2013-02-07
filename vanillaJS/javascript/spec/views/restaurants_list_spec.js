describe( "Restaurants View" , function() {
  
  var invisible_table = document.createElement('table'),
      restaurants_data = [
        {
          id: 0,
          name: 'Ritz',
          postcode: 'N112TP',
          rating: 5
        }, {
          id: 1,
          name: 'Astoria',
          postcode: 'EC1E4R',
          rating: 3
        }, {
          id: 2,
          name: 'Waldorf',
          postcode: 'WE43F2',
          rating: 4
        }
      ];
  
  beforeEach( function() {
    this.server = sinon.fakeServer.create();
    this.restaurants_collection = new Gourmet.Collections.Restaurants( restaurants_data );
    this.restaurants_view = new Gourmet.Views.RestaurantsList ({
      collection: this.restaurants_collection,
      el: invisible_table
    });
  });
  
  afterEach(function() {
    this.server.restore();
  });
  
  it( "should be defined", function() {
    expect( Gourmet.Views.RestaurantsList ).toBeDefined();
  });
  
  it( "should have the right element", function() {
    expect( this.restaurants_view.el ).toEqual( invisible_table );
  });
  
  it( "should have the right collection", function() {
    expect( this.restaurants_view.collection ).toEqual( this.restaurants_collection );
  });
  
  it( "should render the the view when initialized", function() {
    return expect( $(invisible_table).children().length ).toEqual( 3 );
  });
  
  it( "should render when an element is added to the collection", function() {
    this.restaurants_collection.add({
      name: 'Panjab',
      postcode: 'N2243T',
      rating: 5
    });
    expect( $(invisible_table).children().length ).toEqual( 4 );
  });
  
  it("should render when an element is removed from the collection", function() {
    this.restaurants_collection.pop();
    expect( $(invisible_table).children().length ).toEqual( 2 );
  });
  
  it("should remove the restaurant when clicking the remove icon", function() {
    var remove_button = $('.remove', $(invisible_table))[0], 
        removed_restaurant = this.restaurants_collection.get(remove_button.id);
        
    $(remove_button).trigger('click');
    
    expect( this.restaurants_collection.length ).toEqual( 2 );
    expect( this.restaurants_collection.models ).not.toContain( removed_restaurant );
  });
  
  it("should remove a restaurant from the collection", function() {
    var evt = {
      target: {
        id: 1
      }
    };
    
    this.restaurants_view.removeRestaurant(evt);
    
    expect(this.restaurants_collection.length).toEqual(2);
  });
  
  it("should send an ajax request to delete the restaurant", function() {
    var evt = {
      target: {
        id: 1
      }
    };
    
    this.restaurants_view.removeRestaurant(evt);
    
    expect(this.server.requests.length).toEqual(1);
    expect(this.server.requests[0].method).toEqual('DELETE');
    expect(this.server.requests[0].url).toEqual('/restaurants/1');
  });
  
});

