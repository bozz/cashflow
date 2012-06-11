App.TransactionView = Backbone.View.extend({


  template: JST['bank_transactions/detail'],

  events: {
    'click a.btn-close': 'hideModal',
    'click a.btn-submit': 'saveTransaction',
    'hide #transaction-modal': 'closeModal'
  },

  initialize: function(config) {
    this.bankId = config.bankId;
  },

  render: function() {
    $(this.el).html(this.template({bankId: this.bankId, model: this.model}));
    return this;
  },

  hideModal: function(event) {
    if(event.preventDefault) { event.preventDefault(); }
    $('#transaction-modal').modal('hide');
  },

  closeModal: function(event) {
    $('#transaction-modal').parent().remove();
  },

  saveTransaction: function(event) {
    event.preventDefault();

    var amount = App.util.convertEurToUsNumber( $('#tm-amount').val() );

    this.model.set({
      bank_account_id: $('#tm-bank').val(),
      date: $('#tm-date').val(),
      amount: amount,
      description: $('#tm-description').val(),
      note: $('#tm-note').val()
    });

    var options = {
      wait: true,
      success: this.hideModal,
      error: this.handleError
    };

    if (this.model.isNew()) {
      App.transactions.create(this.model, options);
    } else {
      this.model.save(this.model, options);
    }
  },

  handleError: function(model, response) {
    // if validation errors
    if(response.status == 422) {
      // reset any previous errors
      $('div.control-group').removeClass('error').find('p.error-msg').remove();

      // mark all found validation errors
      var errors = $.parseJSON(response.responseText);
      for(var key in errors) {
        $('[name=' + key + ']')
          .closest('div.control-group')
            .addClass('error')
          .find('div.controls')
            .append('<p class="help-block error-msg">' + errors[key] + '</p>');
      }
      // reset values in model since already saved locally
      if(!model.isNew()){
        model.fetch();
      }
    } else {
      // TODO: handle other errors...
      console.log("ERROR!", response, model);
    }
  }

});
