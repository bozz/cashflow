define(function(require) {
  var Backbone = require('backbone');
  var utils = require('utils');
  var tpl = require('text!/templates/accounts/index.jst.ejs');
  var Account = require('models/Account');
  var AccountView = require('views/accounts/detail');

  var AccountsListView = Backbone.View.extend({

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
      var model = new Account();
      this.showAccountDetail(model);
    },

    editAccount: function(event) {
      var id = $(event.currentTarget).attr('value');
      var model = this.collection.get(id);
      this.showAccountDetail(model);
    },

    showAccountDetail: function(model) {
      event.preventDefault();

      view = new AccountView({model: model});
      $('#content').append(view.render().el);
      $('#account-modal').modal();
    },

    deleteAccount: function(event) {
      var id = $(event.currentTarget).attr('value');
      var model = this.collection.get(id);

      bootbox.confirm("Do you really want to delete this account?", "Cancel", "Confirm Delete", function(result) {
        if (result) {
          model.destroy({
            success: function(model, response) {
              console.log("successfully destroyed", model);
            }
          });
        }
      });
    }

  });

  return AccountsListView;
});
