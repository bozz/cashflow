define([
  'text!/templates/bank_accounts/form.jst.ejs',
  'models/BankAccount'
], function(tpl, BankAccount) {

  var BankAccountFormView = Backbone.View.extend({

    template: _.template(tpl),

    events: {
      'click a.btn-submit': 'saveAccount'
    },

    initialize: function (options) {
      options = options || {};

      if(!options.id && !options.model) {
        this.model = new BankAccount();
      } else if(options.model) {
        this.model = options.model;
      } else {
        this.model = new BankAccount({
          id: options.id
        });
        this.model.on('change', this.render, this);
        this.model.fetch();
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
        // this.collection.create(this.model, options);
      } else {
        this.model.save(this.model, options);
      }
    },

    handleSuccess: function(event) {
      if(event.preventDefault) { event.preventDefault(); }

      this.$el.unmask();

      // utils.alertSuccess("Settings saved successfully");
      alert("refresh relevant areas of ui...");
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
