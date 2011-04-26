// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var App = {
  Views: {},
  Collections: {},
  Controllers: {},
  init: function() {
    new App.Controllers.Main();
    Backbone.history.start();
  }
};
