App.Router = Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'dashboard': 'dashboard',
    'journal': 'journal',
    'settings': 'settings'
  },

  dashboard: function() {
    var view = new App.DashboardView();
    $('#content').html(view.render().el);
  },

  journal: function() {
    var view = new App.TransactionsListView();
    $('#content').html(view.render().el);
  },

  settings: function() {
    alert("settings... ");
  }
});
