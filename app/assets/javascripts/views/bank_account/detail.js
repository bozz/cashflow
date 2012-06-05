App.BankAccountView = Backbone.View.extend({

  template: JST['bank_accounts/detail'],

  events: {
    'click a.btn-close': 'hideModal',
    'click a.btn-submit': 'saveAccount',
    'hide #account-modal': 'closeModal'
  },

  render: function() {
    $(this.el).html(this.template({model: this.model}));
    return this;
  },

  hideModal: function(event) {
    if(event.preventDefault) { event.preventDefault(); }
    $('#account-modal').modal('hide');
  },

  closeModal: function(event) {
    $('#account-modal').parent().remove();
  },

  saveAccount: function(event) {
    event.preventDefault();

    this.model.set({
      bank: $('#tm-bank').val(),
      name: $('#tm-name').val(),
      account_number: $('#tm-number').val(),
      // currency: $('#tm-currency').val(),
      // initial_cents: $('#tm-initial').val(),
      description: $('#tm-description').val()
    });

    var options = {
      wait: true,
      success: this.hideModal,
      error: this.handleError
    };
    if (this.model.isNew()) {
      App.bankAccounts.create(this.model, options);
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
      model.fetch();
    } else {
      // TODO: handle other errors...
      console.log("ERROR!", response, model);
    }
  }

});
