App.Transactions = Backbone.Paginator.clientPager.extend({

  model: App.Transaction,

  url: '/api/banks/:bank_id/transactions',

  // @param-name for the query field in the 
  // request (e.g query/keywords/search)
  queryAttribute: 'q',

  // @param-name for number of items to return per request/page
  perPageAttribute: 'limit',

  // @param-name for how many results the request should skip ahead to
  skipAttribute: 'offset',

  // @param-name for the direction to sort in
  sortAttribute: 'sort',

  // @param-name for field to sort by
  orderAttribute: 'orderBy',

  // @param-name for the format of the request
  formatAttribute: 'json',

  // default values
  page: 1,
  firstPage: 1,
  perPage: 20,
  displayPerPage: 20,
  sortField: 'name',
  sortDirection: 'asc',
  query: "",

  // overwrite from backbone.paginator
  syncBak: function ( method, model, options ) {
    var queryMap = {}, params;
    queryMap[this.perPageAttribute] =  this.perPage;
    queryMap[this.skipAttribute] = this.page * this.perPage;
    queryMap[this.orderAttribute] =  this.sortField;
    queryMap[this.queryAttribute] =  this.query;

    params = _.extend({
      type: 'GET',
      dataType: 'json',
      data: decodeURIComponent($.param(queryMap)),
      url: this.url,
      processData: false
    }, options);

    params.error = function(xhr, status, error) {
      console.log("Error loading collection:", xhr, status, error);
    };

    return $.ajax(params);
  },

  // overwrite parse (backbone) to extract results
  parse: function (response) {
    var data = response.data;
    this.totalPages = Math.floor(response.count / this.perPage);
    return data;
  },


  setFilter: function ( fields, filter, bankAccountId ) {
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
  _filter: function ( models, fields, filter ) {

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
