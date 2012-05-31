App.Router = Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'dashboard': 'dashboard',
    'journal': 'journal',
    'accounts': 'accounts',
    'import': 'import'
  },

  dashboard: function() {
    var view = new App.DashboardView();
    $('#content').html(view.render().el);
  },

  journal: function() {
    var view = new App.TransactionsListView();
    $('#content').html(view.render().el);
  },

  accounts: function() {
    var view = new App.AccountsListView();
    $('#content').html(view.render().el);
  },

  import: function() {
    var view = new App.ImportView();
    $('#content').html(view.render().el);
  }
});
