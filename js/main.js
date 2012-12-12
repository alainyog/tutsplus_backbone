require.config({
  baseUrl: "/js/",
  paths: {
    jquery: 'libs/jquery.min',
    underscore: 'libs/underscore.min',
    backbone: 'libs/backbone.min',
    'backbone.validations': 'libs/backbone-validations',
    hogan: 'libs/hogan-wrap'
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
    }
  }
});


require(['app/init'], function(App){
  App.initialize();
});




