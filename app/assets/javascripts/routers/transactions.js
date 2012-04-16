Cashflow.Routers.Transactions = Backbone.Router.extend({
  routes: {
    '': 'index',
    'transactions/:id': 'show'
  },

  index: function() {
    view = new Cashflow.Views.TransactionsIndex();
    $('#container').html(view.render().el);
  },

  show: function(id) {
    alert("show transaction " + id);
  }
});
