// default settings for accounting.js
accounting.settings = {
  currency: {
    symbol: "€",    // default currency symbol is '$'
    format: "%v %s", // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal : ",",  // decimal point separator
    thousand: ".",  // thousands separator
    precision: 2    // decimal places
  },
  number: {
    precision : 0,  // default precision on numbers is 0
    thousand: ".",
    decimal : ","
  }
}

window.App = {
  init: function() {
    App.router = new App.Router();
    Backbone.history.start();
  }
};


App.util = {
  /**
   * Convert numbers from European to US format.
   * Example: 5.500,99 ==> 5500.99
   */
  convertEurToUsNumber: function(val) {
    val = val.replace('.', '');
    val = val.replace(',', '.');
    return val;
  }
};


$(document).ready(function(){
  App.init();
});
