define(function(require) {
  var Backbone = require('backbone');
  var utils = require('utils');
  var tpl = require('text!/templates/bank_accounts/detail.jst.ejs');
  var BankAccountGraphView = require('views/bank_account/graph');
  var BankTransactionListView = require('views/bank_transactions/index');
  var BankAccountFormView = require('views/bank_account/form');
  var ImportView = require('views/bank_transactions/import');

  var BankAccountView = Backbone.View.extend({

    template: _.template(tpl),

    subViews: [],  // list of subview

    initialize: function (options) {
    },

    close: function() {
      this.remove();
      this.unbind();
      this.subViews.forEach(function(item, index) {
        item.close();
      });
    },

    render: function() {
      this.$el.html(this.template({model: this.model}));
      this.renderSubviews();
      return this;
    },

    renderSubviews: function() {
      var params = {
        bankId: this.model.get('id'),
        parentView: this
      };
      this.subViews = [];
      this.showSubview('#tab-overview', BankAccountGraphView, params);
      this.showSubview('#tab-transactions', BankTransactionListView, params);
      this.showSubview('#tab-bank-account', BankAccountFormView, params);
      this.showSubview('#tab-import', ImportView, params);
    },

    showSubview: function(selector, viewConstructor, params) {
      var view = new viewConstructor(_.extend(params, {
        el: $(selector, this.$el).get(0)
      }));
      view.render();
      this.subViews.push(view);
      return view;
    }

  });

  return BankAccountView;
});
