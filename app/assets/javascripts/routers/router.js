App.Router = Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'dashboard': 'dashboard',
    'banking': 'banking',
    'banking/:id': 'bankDetail',
    'accounting': 'accounting',
    'accounts': 'accounts'
  },

  dashboard: function() {
    var view = new App.DashboardView();
    $('#content').html(view.render().el);
  },

  banking: function() {
    var view = new App.BankAccountListView();
    $('#content').html(view.render().el);
  },

  bankDetail: function(id) {
    var view = new App.BankTransactionListView({bankId: id});
    $('#content').html(view.render().el);
  },

  accounting: function() {
    var view = new App.AccountsListView();
    $('#content').html(view.render().el);
  },

  accounts: function() {
    var view = new App.AccountsListView();
    $('#content').html(view.render().el);
  }
});
