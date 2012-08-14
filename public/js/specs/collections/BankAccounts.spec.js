describe("BankAccounts collection", function() {

  beforeEach(function() {
    this.stubSpy = sinon.spy(Backbone, 'Model');
    var stub = {'models/BankAccount': this.stubSpy};
    var BankAccounts = testr('collections/BankAccounts', stub);
    this.bankAccounts = BankAccounts.getInstance();
  });

  afterEach(function() {
    this.stubSpy.restore();
  });

  describe("When instantiated with model literal", function() {

    beforeEach(function() {
      var modelConfig = {id: 5, name: 'Foo'};
      this.model = new Backbone.Model(modelConfig);
      this.bankAccounts.reset();
      this.bankAccounts.add(modelConfig);
    });

    it("should have 1 BankAccount model", function() {
      expect(this.bankAccounts.length).toEqual(1);
      expect(this.stubSpy).toHaveBeenCalled();
    });

    it("should find a model by id", function() {
      expect(this.bankAccounts.get(5).get("id")).toEqual(this.model.get("id"));
    });

    it("should find a model by index", function() {
      expect(this.bankAccounts.at(0).get("id")).toEqual(this.model.get("id"));
    });

    it("should have called the BankAccount constructor", function() {
      expect(this.stubSpy).toHaveBeenCalledTwice();
      expect(this.stubSpy).toHaveBeenCalledWith({id:5, name:"Foo"});
    });
  });


  describe("when fetching collection from server", function() {

    beforeEach(function() {
      this.fixture = this.fixtures.BankAccounts.valid;
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
        "GET",
        "/api/banks/",
        this.validResponse(this.fixture.response)
      );
    });

    afterEach(function() {
      this.server.restore();
    });

    it("should make the correct request", function() {
      this.bankAccounts.fetch();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toEqual("/api/banks/");
    });

    it("should parse the bankAccounts from the response", function() {
      this.bankAccounts.fetch();
      this.server.respond();
      expect(this.bankAccounts.length).toEqual(this.fixture.response.length);
      expect(this.bankAccounts.get(1).get('name')).toEqual(this.fixture.response[0].name)
    });

  });

});
