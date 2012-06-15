App.BankAccountView = Backbone.View.extend({

  template: JST['bank_accounts/form'],

  events: {
    'click #bank-account-submit': 'saveAccount',

    'click a.btn-submit': 'saveAccount',
    'click a.btn-close': 'hideModal',
    'hide div.modal': 'closeModal'
  },

  initialize: function (options) {
    this.parentView = options.parentView;
    if(options.bankId) {
      this.bankId = options.bankId;
      this.model = App.bankAccounts.get(this.bankId);
    } else {
      this.model = options.model;
    }
  },

  render: function() {
    if(this.model.isNew()) {
      var html = this.template({model: this.model, showFormActions: false});
      App.util.renderModalView(this.$el, html, "Create Transaction", "Create Transaction");
    } else {
      var html = this.template({model: this.model, showFormActions: true});
      $('#tab-bank-account', this.parentView.el).html(this.$el.html(html));
    }
    return this;
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

  hideModal: function(event) {
    if(event.preventDefault) { event.preventDefault(); }
    $('div.modal', this.$el).modal('hide');
  },

  closeModal: function(event) {
    if(event.preventDefault) { event.preventDefault(); }
    this.hideModal(event);
    this.$el.remove();
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
