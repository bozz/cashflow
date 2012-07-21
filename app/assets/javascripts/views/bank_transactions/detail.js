App.TransactionView = Backbone.View.extend({

  events: {
    'click a.btn-close': 'hideModal',
    'click a.btn-submit': 'saveTransaction',
    'hide #transaction-modal': 'closeModal'
  },

  initialize: function(config) {
    this.bankId = config.bankId;
  },

  render: function() {
    var template = App.util.getTemplate('bank_transactions/detail');
    var self = this;

    $(this.el).html(template({bankId: this.bankId, model: this.model}));

    this.$el.find('div.date').datepicker({ weekStart: 1 })
      .on('show', function() {
        self.showingDatepicker = true;
      });

    return this;
  },

  hideModal: function(event) {
    if(event.preventDefault) { event.preventDefault(); }

    $(this.el).unmask();

    $('#transaction-modal').modal('hide');
  },

  closeModal: function(event) {
    if(!this.showingDatepicker) {
      $('#transaction-modal').parent().remove();
    }
    this.showingDatepicker = false;
  },

  saveTransaction: function(event) {
    event.preventDefault();
    var self = this;

    var amount = App.util.convertEurToUsNumber( this.$el.find('#tm-amount').val() );
    var date   = App.util.convertDateToDbFormat( this.$el.find('#tm-date').val() );

    this.model.set({
      bank_account_id: this.bankId,
      date: date,
      amount: amount,
      description: $('#tm-description').val(),
      note: $('#tm-note').val()
    });

    var options = {
      wait: true,
      success: function(event) {
        App.util.alertSuccess("Saved successfully");
        self.hideModal(event);
      },
      error: this.handleError
    };

    $(this.el).mask("Saving...");
    if (this.model.isNew()) {
      App.transactions.create(this.model, options);
      App.transactions.pager();
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
      App.util.alertError(response.errorMsg);
    }
  }

});
