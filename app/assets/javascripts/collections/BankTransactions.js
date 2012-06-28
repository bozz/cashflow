App.BankTransactions = App.BaseCollection.extend({

  model: App.BankTransaction,

  defaultOrder: 'date DESC',

  initialize: function(config) {
    this.bankId = config.bankId;
  },

  url: function() {
    return '/api/banks/' + this.bankId + '/transactions';
  }

});
