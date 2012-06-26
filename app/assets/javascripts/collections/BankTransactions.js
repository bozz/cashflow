App.BankTransactions = Backbone.Paginator.requestPager.extend({

  model: App.Transaction,

  initialize: function(config) {
    this.bankId = config.bankId;
  },

  paginator_core: {
    type: 'GET',
    dataType: 'json',
    url: function() {
      return '/api/banks/' + this.bankId + '/transactions';
    }
  },

  paginator_ui: {
    firstPage: 1,
    currentPage: 1,
    perPage: 20,
    totalPages: 10
  },

  server_api: {
    // the query field in the request
    q: '',

    // number of items to return per request/page
    per: function() { return this.perPage },
    page: function() { return this.currentPage },

    // how many results the request should skip ahead to
    // customize as needed. For the Netflix API, skipping ahead based on
    // page * number of results per page was necessary.
    // '$skip': function() { return this.currentPage * this.perPage },

    // field to sort by
    order: 'date DESC',

    // custom parameters
    bank_id: function() { return this.bankId; }

    // '$inlinecount': 'allpages',
    // '$callback': 'callback'
  },

  // overwrite parse (backbone) to extract results
  parse: function (response) {
    var data = response.data;
    this.totalPages = Math.ceil(response.count / this.perPage);
    return data;
  },

  // override from backbone.paginator.js to add bankAccountId param
  xxsetFilter: function ( fields, filter, bankAccountId ) {
    if( fields !== undefined && filter !== undefined ){
      this.filterFields = fields;
      this.filterBankAccount = bankAccountId || false;
      this.lastFilterExpression = this.filterExpression;
      this.filterExpression = filter;
      this.pager();
      this.info();
    }
  },

  // overwrite in order to add filtering for bank_accounts
  xx_filter: function ( models, fields, filter ) {

    var self = this;

    //  For example, if you had a data model containing cars like { color: '', description: '', hp: '' },
    //  your fields was set to ['color', 'description', 'hp'] and your filter was set
    //  to "Black Mustang 300", the word "Black" will match all the cars that have black color, then
    //  "Mustang" in the description and then the HP in the 'hp' field.
    //  NOTE: "Black Musta 300" will return the same as "Black Mustang 300"

    // We accept fields to be a string or an array,
    // but if string is passed we need to convert it
    // to an array.
    if( _.isString( fields ) ) {
      var tmp_s = fields;
      fields = [];
      fields.push(tmp_s);
    }

    // 'filter' can be only a string.
    // If 'filter' is string we need to convert it to 
    // a regular expression. 
    // For example, if 'filter' is 'black dog' we need
    // to find every single word, remove duplicated ones (if any)
    // and transform the result to '(black|dog)'
    if( filter === '' || !_.isString(filter) ) {
      return models;
    } else {
      filter = filter.match(/\w+/ig);
      filter = _.uniq(filter);
      var pattern = "(" + filter.join("|") + ")";
      var regexp = new RegExp(pattern, "igm");
    }

    var filteredModels = [];

    // We need to iterate over each model
    _.each( models, function( model ) {

      var matchesPerModel = [];

      if(self.filterBankAccount && self.filterBankAccount > 0) {
        var bank_account_id = model.get('bank_account_id');
        if(self.filterBankAccount != model.get('bank_account_id')) {
          return false;
        }
      }

      // and over each field of each model
      _.each( fields, function( field ) {

        var value = model.get( field );

        if( value ) {

          // The regular expression we created earlier let's us to detect if a
          // given string contains each and all of the words in the regular expression
          // or not, but in both cases match() will return an array containing all 
          // the words it matched.
          var matchesPerField = model.get( field ).toString().match( regexp );
          matchesPerField = _.map(matchesPerField, function(match) {
            return match.toString().toLowerCase();
          });

          _.each(matchesPerField, function(match){
            matchesPerModel.push(match);
          });

        }

      });

      // We just need to check if the returned array contains all the words in our
      // regex, and if it does, it means that we have a match, so we should save it.
      matchesPerModel = _.uniq( _.without(matchesPerModel, "") );

      if(  _.isEmpty( _.difference(filter, matchesPerModel) ) ) {
        filteredModels.push(model);
      }

    });

    return filteredModels;
  }

});
