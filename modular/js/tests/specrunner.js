require.config({
  
  baseUrl: "../",
  urlArgs: 'cb=' + Math.random(),
  
  paths: {
    jquery: 'libs/jquery.min',
    underscore: 'libs/underscore.min',
    backbone: 'libs/backbone.min',
    'backbone.validations': 'libs/backbone-validations',
    hogan: 'libs/hogan-wrap',
    jasmine: 'tests/libs/jasmine-1.2.0/jasmine',
    'jasmine-html': 'tests/libs/jasmine-1.2.0/jasmine-html',
    'jasmine-jquery': 'tests/libs/jasmine-jquery',
    sinon: 'libs/sinon',
    spec_folder: 'tests/specs'
  },
  
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
    ,
    'backbone.validations': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    'jasmine-jquery': {
      exports: 'jasmine'
    },
    sinon: {
      exports: 'sinon'
    },
  }
  
});

window.store = "TestStore"; // override local storage store name - for testing

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  //specs.push('tests/specs/init_spec');
  specs.push('spec_folder/models/restaurant_spec');
  specs.push('spec_folder/collections/restaurants_spec');
  specs.push('spec_folder/views/restaurants_list_spec');
  specs.push('tests/specs/views/restaurant_form_spec');
  
  
  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});
