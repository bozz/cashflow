describe('BankAccountFormView', function() {

  var BankAccountFormView;

  beforeEach(function() {
    this.bankAccountStub = sinon.spy(Backbone.Model.extend({
      urlRoot: '/api/banks/'
    }));
    BankAccountFormView = testr('views/bank_account/form', {
      'models/BankAccount': this.bankAccountStub
    });
  });

  describe("When instantiated with existing model", function() {

    beforeEach(function() {
      this.bankAccount = Factory.createModel('BankAccount');
      this.view = new BankAccountFormView({
        model: this.bankAccount
      });
      this.view.render();
    });

    it("should create a default DIV element", function() {
      expect(this.view.el.nodeName).toEqual("DIV");
    });

    it("should contain a FORM element with class 'form-horizontal'", function() {
      expect(this.view.$el).toContain('form.form-horizontal');
    });

    it("should have 'name' input field initialized with model name", function() {
      expect($('input#ba-name', this.view.$el)).toHaveValue(this.bankAccount.get('name'));
    });

    it("should not create new model", function() {
      expect(this.bankAccountStub).not.toHaveBeenCalled();
    });

  });

  describe("When instantiated with model id", function() {

    describe("without collection", function() {

      beforeEach(function() {
        this.server = sinon.fakeServer.create();
        this.factoryResponse = Factory.createResponse('BankAccount', 'valid');
        this.server.respondWith(
          "GET",
          "/api/banks/1",
          this.factoryResponse.wrapped
        );

        this.view = new BankAccountFormView({
          id: 1
        });
        // this.renderSpy = sinon.spy(this.view, 'render');
      });

      afterEach(function() {
        this.server.restore();
      })

      it("should make correct request to fetch model", function(){
        expect(this.server.requests.length).toEqual(1);
        expect(this.server.requests[0].method).toEqual("GET");
        expect(this.server.requests[0].url).toEqual("/api/banks/1");
      });

      it("should fetch and initialize model", function() {
        this.server.respond();
        var raw = this.factoryResponse.raw;
        expect(this.view.model.get('id')).toEqual(raw.response.id);
        expect(this.view.model.get('name')).toEqual(raw.response.name);
        expect(this.view.model.isNew()).not.toBeTruthy();
      });

      it("should render view after fetching model", function() {
        this.server.respond();
        // expect(this.renderSpy).toHaveBeenCalledOnce();
        expect($('input#ba-bank', this.view.$el)).toHaveValue(this.view.model.get('bank'));
      });

    });

  });

  describe("When instantiated with no model or model id", function() {

    beforeEach(function() {
      this.view = new BankAccountFormView();
      this.view.render();
    });

    it("should create new model", function() {
      expect(this.bankAccountStub).toHaveBeenCalledOnce();
    });

    it("should have model without id and be flagged as new", function() {
      expect(this.view.model.id).toBeUndefined();
      expect(this.view.model.isNew()).toBeTruthy();
    });

  });

});
