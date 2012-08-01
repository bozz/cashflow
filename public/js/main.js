require.config({
  paths: {
    // Third-Party Libraries
    jquery: "../vendor/jquery/jquery-1.7.2",
    underscore: "../vendor/underscore/underscore-1.3.3",
    backbone: "../vendor/backbone/backbone-0.9.2",
    bootstrap: "../vendor/bootstrap/js/bootstrap",
    accounting: "../vendor/accounting/accounting-0.3.2",
    moment: "../vendor/moment/moment-1.6.2",

    // Plugins and Extensions
    text: "../vendor/require-text/text-2.0.1",
    backbonePaginator: "../vendor/backbone-paginator/backbone.paginator",
    jqueryLoadmask: "../vendor/jquery-loadmask/jquery.loadmask-0.4",
    jqueryUpload: "../vendor/jquery-upload/jquery.upload-1.0.2",
    bootstrapBootbox: "../vendor/bootstrap-bootbox/bootbox-2.3.1",
    bootstrapDatepicker: "../vendor/bootstrap-datepicker/datepicker"
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"  //attaches "Backbone" to the window object
    },
    backbonePaginator: ["backbone"],
    jqueryLoadmask: ["jquery"],
    jqueryUpload: ["jquery"],
    bootstrap: ["jquery"],
    bootstrapBootbox: ["bootstrap"],
    bootstrapDatepicker: ["bootstrap"]

  } // end Shim Configuration
});


require([
  'underscore',
  'jquery',
  'jqueryLoadmask',
  'jqueryUpload',
  'backbone',
  'backbonePaginator',
  'app'
], function(_, $, loadmask, upload, Backbone, Paginator, App) {
  App.initialize();
});
