App.BankTransaction = Backbone.Model.extend({

  toJSON: function() {
    return { bank_transaction: _.clone( this.attributes ) }
  },

  // return date formatted by defined localDateFormat
  getFormattedDate: function() {
    var dateFormat = App.util.localDateFormat.toUpperCase();
    return moment(this.get('date')).format(dateFormat);
  }

});
