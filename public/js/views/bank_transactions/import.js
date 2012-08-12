define(function(require) {
  var Backbone = require('backbone');
  var utils = require('utils');
  var tpl = require('text!/templates/bank_transactions/import.jst.ejs');

  var ImportView = Backbone.View.extend({

    template: _.template(tpl),

    events: {
      'click #it-submit': 'submitTransactions'
    },

    initialize: function (options) {
      this.bankId = options.bankId;
      this.parentView = options.parentView;
    },

    close: function() {
      this.remove();
      this.unbind();
    },

    render: function() {
      var html = this.template({bankId: this.bankId});
      this.$el.html(html);
      this.delegateEvents();

      return this;
    },

    submitTransactions: function(event) {
      event.preventDefault();

      var self = this;
      var form = $("#it-form");
      var params = {
        bank_account_id: $('#it-bank', form).val()
      };

      $('fieldset', form).upload(form.attr('action'), params, function(result) {
        // reset any previous errors
        $('div.control-group', self.el).removeClass('error').find('p.error-msg').remove();

        if(result.errors) {
          self.handleErrors(result.errors);
        } else {
          self.resetForm(form);
          alert('Sucessfully imported ' + result.numberImported + ' Transactions.');
        }
      }, 'json');

      return false;
    },

    handleErrors: function(errors) {
      // mark all found validation errors
      for(var key in errors) {
        $('[name=' + key + ']', this.el)
        .closest('div.control-group')
        .addClass('error')
        .find('div.controls')
        .append('<p class="help-block error-msg">' + errors[key] + '</p>');
      }
    },

    // TODO: extract to some common utils...
    resetForm: function(form) {
      $(':input', $(form)).each(function(i, item) {
        switch(item.tagName.toLowerCase()) {
          case 'input':
            switch(item.type.toLowerCase()) {
            case 'hidden':
              case 'text':
              case 'file':
              item.value = '';
            break;
            case 'radio':
              case 'checkbox':
              item.checked = '';
            break;
          }
          break;
          case 'select':
            item.selectedIndex = 0;
          break;
          case 'textarea':
            item.value = '';
          break;
        }
      });
    }

  });

  return ImportView;
});
