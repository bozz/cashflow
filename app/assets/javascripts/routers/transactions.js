Cashflow.Routers.Transactions = Backbone.Router.extend({
  routes: {
    '': 'index',
    'transactions/:id': 'show'
  },

  initialize: function() {
    this.collection = new Cashflow.Collections.Transactions();
    this.collection.fetch();
  },

  index: function() {
    view = new Cashflow.Views.TransactionsIndex({collection: this.collection});
    $('#container').html(view.render().el);
  },

  show: function(id) {
    alert("show transaction " + id);
  }
});
