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

window.Cashflow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    var transactionRouter = new Cashflow.Routers.Transactions();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Cashflow.init();
});
