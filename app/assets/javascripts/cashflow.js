// default settings for accounting.js
accounting.settings = {
  currency: {
    symbol: "€",    // default currency symbol is '$'
    format: "%v %s", // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal : ",",  // decimal point separator
    thousand: ".",  // thousands separator
    precision: 2    // decimal places
  },
  number: {
    precision : 0,  // default precision on numbers is 0
    thousand: ".",
    decimal : ","
  }
}

window.App = {
  init: function() {
    App.router = new App.Router();
    Backbone.history.start();
  }
};


App.util = {

  getTemplate: function(path) {
    return JST[path];
  },

  localDateFormat: 'dd.mm.yyyy',

  convertDateToDbFormat: function(date) {
    return moment(date, App.util.localDateFormat.toUpperCase()).format('YYYY-MM-DD');
  },

  /**
   * Convert numbers from European to US format.
   * Example: 5.500,99 ==> 5500.99
   */
  convertEurToUsNumber: function(val) {
    val = val.replace('.', '');
    val = val.replace(',', '.');
    return val;
  },

  /** display growl like error notification */
  alertError: function(msg, title) {
    var title = title || 'Error!';
    var view = new App.AlertView({
      alertClass: 'alert-error',
      title: title,
      msg: msg
    });
    view.render();
  },

  /** display growl like success notification */
  alertSuccess: function(msg, title) {
    var title = title || 'Success!';
    var view = new App.AlertView({
      alertClass: 'alert-success',
      title: title,
      msg: msg
    });
    view.render();
  },

  /** utitly function for creating modal windows */
  renderModalView: function($el, html, title, saveText) {
    title = title || "";
    saveText = saveText || "Submit";
    var modalTemplate = JST['misc/modal'];
    $el.html(modalTemplate({title: title, saveText: saveText}));
    $('div.modal-body', $el).append(html);
    $('html').append($el);
    $('div.modal', $el).modal();
  }
};


$(document).ready(function(){
  App.init();
});
