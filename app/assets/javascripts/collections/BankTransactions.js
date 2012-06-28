App.BankTransactions = App.BaseCollection.extend({

  model: App.BankTransaction,

  defaultOrder: 'date DESC',

  initialize: function(config) {
    this.bankId = config.bankId;
    this.initCustomApiParams();
  },

  url: function() {
    return '/api/banks/' + this.bankId + '/transactions';
  },

  initCustomApiParams: function() {
    this.server_api.bank_id = function() { return this.bankId; }
  }

});
