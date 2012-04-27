App.Router = Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'dashboard': 'dashboard',
    'journal': 'journal',
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

  import: function() {
    var view = new App.ImportView();
    $('#content').html(view.render().el);
  }
});
