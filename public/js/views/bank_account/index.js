define(function(require) {
  var utils = require('utils');
  var tpl = require('text!/templates/bank_accounts/index.jst.ejs');
  var BankAccount = require('models/BankAccount');
  var BankAccountView = require('views/bank_account/detail');

  var BankAccountListView = Backbone.View.extend({

    template: _.template(tpl),

    events: {
      'click button.btn-new': 'newAccount',
      'click button.btn-edit': 'editAccount',
      'click button.btn-delete': 'deleteAccount'
    },

    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.render, this);
      this.collection.on('change', this.render, this);
      this.collection.on('destroy', this.render, this);
    },

    render: function() {
      $(this.el).html(this.template({accounts: this.collection}));
      return this;
    },

    newAccount: function(event) {
      var model = new BankAccount();
      this.showAccountDetail(model);
    },

    editAccount: function(event) {
      // var id = $(event.currentTarget).attr('value');
      // var model = this.collection.get(id);
      // this.showAccountDetail(model);
    },

    showAccountDetail: function(model) {
      event.preventDefault();

      view = new BankAccountView({model: model});
      $('#content').append(view.render().el);
      $('#account-modal').modal();
    },

    deleteAccount: function(event) {
      var id = $(event.currentTarget).attr('value');
      var model = this.collection.get(id);

      bootbox.confirm("Do you really want to delete this bank account?", "Cancel", "Confirm Delete", function(result) {
        if (result) {
          model.destroy({
            success: function(model, response) {
              utils.alertSuccess("Bank account deleted");
            }
          });
        }
      });
    }

  });

  return BankAccountListView;
});
