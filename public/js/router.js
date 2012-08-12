define(function(require) {
  var Backbone = require('backbone');
  var DashboardView = require('views/dashboard/index');
  var BankAccountListView = require('views/bank_account/index');
  var BankAccountView = require('views/bank_account/detail');
  var AccountsListView = require('views/accounts/index');

  var Router = Backbone.Router.extend({
    contentEl: null,    // target DOM element for content
    currentView: null,  // reference to current view

    initialize: function(contentSelector) {
      contentSelector = contentSelector || '#content';
      this.contentEl = $(contentSelector).get(0);
    },

    routes: {
      '': 'dashboard',
      'dashboard': 'dashboard',
      'banking': 'banking',
      'banking/:id': 'bankDetail',
      'accounting': 'accounting',
      'accounts': 'accounts'
    },

    showView: function(viewConstructor, params) {
      if (this.currentView) {
        this.currentView.close();
      }
      params = _.extend({el: this.contentEl}, (params || {}));
      var view = new viewConstructor(params).render();
      this.currentView = view;
      return view;
    },

    dashboard: function() {
      this.showView(DashboardView);
    },

    banking: function() {
      console.log("banking...");
      this.showView(BankAccountListView);
    },

    bankDetail: function(id) {
      this.showView(BankAccountView, {id: id});
    },

    accounting: function() {
      this.showView(AccountsListView);
    },

    accounts: function() {
      this.showView(AccountsListView);
    }
  });

  return Router;
});
