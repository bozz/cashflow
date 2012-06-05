App.Router = Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'dashboard': 'dashboard',
    'banking': 'banking',
    'banking/:id': 'banking',
    'accounting': 'accounting',
    'accounts': 'accounts',
    'import': 'import'
  },

  dashboard: function() {
    var view = new App.DashboardView();
    $('#content').html(view.render().el);
  },

  banking: function(id) {
    var view = new App.BankAccountListView();
    $('#content').html(view.render().el);
  },

  accounting: function() {
    var view = new App.AccountsListView();
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
