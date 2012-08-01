define(function(require) {
  var Backbone = require('backbone');
  var DashboardView = require('views/dashboard/index');
  var BankAccountListView = require('views/bank_account/index');
  var BankAccountView = require('views/bank_account/detail');
  var AccountsListView = require('views/accounts/index');

  var Router = Backbone.Router.extend({
    routes: {
      '': 'dashboard',
      'dashboard': 'dashboard',
      'banking': 'banking',
      'banking/:id': 'bankDetail',
      'accounting': 'accounting',
      'accounts': 'accounts'
    },

    dashboard: function() {
      var view = new DashboardView();
      $('#content').html(view.render().el);
    },

    banking: function() {
      var view = new BankAccountListView();
      $('#content').html(view.render().el);
    },

    bankDetail: function(id) {
      var model = {}; //App.bankAccounts.get(id);
      var view = new BankAccountView({model: model});
      $('#content').html(view.render().el);
    },

    accounting: function() {
      var view = new AccountsListView();
      $('#content').html(view.render().el);
    },

    accounts: function() {
      var view = new AccountsListView();
      $('#content').html(view.render().el);
    }
  });

  return Router;
});
