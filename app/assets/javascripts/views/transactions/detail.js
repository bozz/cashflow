Cashflow.Views.TransactionsDetail = Backbone.View.extend({

  template: JST['transactions/detail'],

  events: {
    'click a.btn-close': 'hideModal',
    'click a.btn-submit': 'saveTransaction',
    'hide #transaction-modal': 'closeModal'
  },

  initialize: function() {
    // this.collection.on('reset', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({model: this.model}));
    return this;
  },

  hideModal: function(event) {
    $('#transaction-modal').modal('hide');
  },

  closeModal: function(event) {
    // TODO: check why parent() necessary?
    $('#transaction-modal').parent().remove();
  },

  saveTransaction: function(event) {
    this.model.set({
      bank_account_id: $('#tm-bank').val(),
      date: $('#tm-date').val(),
      amount: $('#tm-amount').val(),
      description: $('#tm-description').val()
    });
    if (this.model.isNew()) {
      this.collection.create(this.model, {
        wait: true,
        success: this.hideModal,
        error: this.handleError
      });
    } else {
      this.model.save(null, {
        wait: true,
        success: this.hideModal,
        error: this.handleError
      });
    }
  },

  handleError: function(model, response) {
    if(response.status == 422) {
      var errors = $.parseJSON(response.responseText);
      for(var key in errors) {
        console.log("validation error: ", key, errors[key]);
      }
      // reset values in model since already saved locally
      model.fetch();
    }
  }

});
