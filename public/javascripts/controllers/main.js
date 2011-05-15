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
      App.global = {};

      App.global.transactions = new App.Collections.Transactions();
      App.global.accounts = new App.Collections.Accounts();

      var transactionsRequest = App.global.transactions.fetch();
      var accountsRequest = App.global.accounts.fetch();

      $.when( transactionsRequest, accountsRequest ).then(function(transactionsResponse, accountsResponse) {
        //console.log("accounts response2:  ", App.global.accounts);
        if(transactionsResponse) {
          new App.Views.TransactionList({ collection: App.global.transactions });
        }
      }, function() {
        console.log("Error loading transactions...");
        new Error({ message: "Error loading transactions." });
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


