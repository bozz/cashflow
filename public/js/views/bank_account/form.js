define([
  'text!/templates/bank_accounts/form.jst.ejs',
  'collections/BankAccounts'
], function(tpl, BankAccounts) {

  var BankAccountFormView = Backbone.View.extend({

    isModal: false,  // for new items, modal view is used

    template: _.template(tpl),

    events: {
      'click a.btn-submit': 'saveAccount',
      'click a.btn-close': 'hideModal'
    },

    initialize: function (options) {
      options = options || {};
      this.collection = BankAccounts.getInstance();
      this.parentView = options.parentView;
      if(options.bankId) {
        this.bankId = options.bankId;
        this.model = this.collection.get(this.bankId);
      } else {
        this.isModal = true;
        this.model = options.model;
      }
    },

    close: function() {
      this.remove();
      this.unbind();
    },

    render: function() {
      var html = this.template({model: this.model, showFormActions: true});
      this.$el.html(html);
      return this;
    },

    saveAccount: function(event) {
      event.preventDefault();

      this.model.set({
        bank: $('#ba-bank').val(),
        name: $('#ba-name').val(),
        account_number: $('#ba-number').val(),
        // currency: $('#ba-currency').val(),
        // initial_cents: $('#ba-initial').val(),
        description: $('#ba-description').val()
      });

      var options = {
        wait: true,
        success: $.proxy(this.handleSuccess, this),
        error: $.proxy(this.handleError, this)
      };

      this.$el.mask("Saving...");
      if (this.model.isNew()) {
        this.collection.create(this.model, options);
      } else {
        this.model.save(this.model, options);
      }
    },

    handleSuccess: function(event) {
      if(event.preventDefault) { event.preventDefault(); }

      this.$el.unmask();

      if(this.isModal) {
        // utils.alertSuccess("Bank account created successfully");
        this.closeModal(event);
      } else {
        // utils.alertSuccess("Settings saved successfully");
        alert("refresh relevant areas of ui...");
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
      $(this.el).unmask();
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
        // utils.alertError(response.errorMsg);
      }
    }

  });

  return BankAccountFormView;
});
