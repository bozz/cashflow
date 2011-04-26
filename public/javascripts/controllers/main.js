App.Controllers.Main = Backbone.Controller.extend({
    routes: {
      "":               "dashboard",
      'dashboard':      "dashboard",
      "transactions":   "transactions",
      "accounts":       "accounts"
    },

    dashboard: function() {
      new App.Views.Dashboard();
    },

    transactions: function() {
      var transactions = new App.Collections.Transactions();
      transactions.fetch({
        success: function(data) {
          new App.Views.TransactionList({ collection: transactions });
        },
        error: function() {
          new Error({ message: "Error loading transactions." });
        }
      });
    },

    accounts: function() {
      var accounts = new App.Collections.Accounts();
      accounts.fetch({
        success: function(data) {
          new App.Views.AccountList({ collection: accounts });
        },
        error: function() {
          new Error({ message: "Error loading accounts." });
        }
      });
    }
});


