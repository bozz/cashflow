require.config({
  paths: {
    'tpl': "./../templates",

    // Third-Party Libraries
    jquery: "../vendor/jquery/jquery-1.7.2",
    underscore: "../vendor/underscore/underscore-1.3.3",
    backbone: "../vendor/backbone/backbone-0.9.2",
    bootstrap: "../vendor/bootstrap/js/bootstrap",
    accounting: "../vendor/accounting/accounting-0.3.2",
    moment: "../vendor/moment/moment-1.6.2",
    d3: "../vendor/d3/d3.v2",

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
    bootstrapDatepicker: ["bootstrap"],
    d3: {
      exports: 'd3'
    },
    accounting: {
      exports: 'accounting'
    }
  } // end Shim Configuration
});


require([
  'underscore',
  'jquery',
  'jqueryLoadmask',
  'jqueryUpload',
  'backbone',
  'backbonePaginator',

  // include tested modules
  // 'moment',
  // 'utils',
  // 'accounting',
  // 'd3',
  // 'text',
  // 'text!/templates/bank_accounts/index.jst/ejs',
  // 'text!/templates/bank_accounts/detail.jst/ejs',
  // 'text!/templates/bank_accounts/graph.jst/ejs',
  // 'text!/templates/bank_accounts/form.jst/ejs',
  // 'text!/templates/bank_transactions/index.jst/ejs',
  // 'text!/templates/bank_transactions/detail.jst/ejs',
  // 'text!/templates/bank_transactions/import.jst/ejs',
  'models/BankAccount',
  // 'models/BankTransaction',
  'collections/BankAccounts',
  // 'collections/BankTransactions',
  // 'views/bank_account/index',
  // 'views/bank_account/detail',
  // 'views/bank_account/graph',
  'views/bank_account/form',
  // 'views/bank_transactions/index',
  // 'views/bank_transactions/detail',
  // 'views/bank_transactions/import',
  // 'views/misc/alert',
  // 'views/misc/pagination',

  // include all specs to be run
  'specs/collections/BankAccounts.spec',
  'specs/models/BankAccount.spec',
  'specs/views/bank_account/BankAccountFormView.spec'
  // 'specs/views/bank_account/BankAccountListView'
], function(_, $, loadmask, upload, Backbone, Paginator) {
  console.log("runt tests...", Backbone);
  // run tests
  jasmine.getEnv().addReporter(new jasmine.HtmlReporter());
  jasmine.getEnv().execute();
});
