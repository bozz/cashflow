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
