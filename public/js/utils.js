// util module
define(function(require) {
  var moment = require('moment');
  // var AlertView = require('views/misc/alert');

  return {

    getTemplate: function(path) {
      return JST[path];
    },

    localDateFormat: 'dd.mm.yyyy',

    convertDateToDbFormat: function(date) {
      return moment(date, this.localDateFormat.toUpperCase()).format('YYYY-MM-DD');
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
      // var view = new AlertView({
      //   alertClass: 'alert-error',
      //   title: title,
      //   msg: msg
      // });
      // view.render();
    },

    /** display growl like success notification */
    alertSuccess: function(msg, title) {
      var title = title || 'Success!';
      // var view = new AlertView({
      //   alertClass: 'alert-success',
      //   title: title,
      //   msg: msg
      // });
      // view.render();
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

});
