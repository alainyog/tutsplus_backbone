class Gourmet.Views.RestaurantForm extends Backbone.View

  events:
    'click #save': 'save'

  save: ->
    # [.serializeArray()](http://api.jquery.com/serializeArray/) 
    # jQuery Method to _Encode a set of form elements as an array of names and values_
    data = @parseFormData(@$el.serializeArray())
    new_restaurant = new Gourmet.Models.Restaurant data

    # [validate](http://backbonejs.org/#Model-validate)  
    # `model.validate(attributes)`   
    # Backbone method for models that _is called before set and save, and is passed the model attributes updated with the values from set or save._
    errors = new_restaurant.validate(new_restaurant.attributes)

    # [create](http://backbonejs.org/#Collection-create)  
    # `collection.create(attributes, [options])`   
    # _Creating a model will cause an immediate `add` event to be triggered on the collection, as well as a `sync event, once the model has been successfully created on the server_
    if errors then @handleErrors(errors) else @collection.create new_restaurant

  parseFormData: (serialized_array) ->
    # [reduce](http://documentcloud.github.com/underscore/#reduce)   
    # `_.reduce(list, iterator, memo, [context])`   
    # Backbone method for models that _is called before set and save, and is passed the model attributes updated with the values from set or save._
    _.reduce serialized_array, @parseFormField, {}

  parseFormField: (collector, field_obj) ->
    name = field_obj.name.match(/\[(\w+)\]/)[1]
    collector[name] = field_obj.value
    collector

  handleErrors: (errors) ->
    $('.control-group').removeClass 'error'
    for key in (_.keys errors)
      do (key) ->
        input = $("#restaurant_#{key}")
        input.closest('.control-group').addClass 'error'