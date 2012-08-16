// BankTransaction module
define(function(require) {
  var utils = require('utils');

  var BankTransaction = Backbone.Model.extend({

    toJSON: function() {
      return { bank_transaction: _.clone( this.attributes ) }
    },

    // return date formatted by defined localDateFormat
    getFormattedDate: function() {
      var dateFormat = utils.localDateFormat.toUpperCase();
      return moment(this.get('date')).format(dateFormat);
    }

  });

  return BankTransaction;
});
