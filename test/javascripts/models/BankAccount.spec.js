describe("Bank Account model", function() {

  beforeEach(function() {
    this.bankAccount = new App.BankAccount({
      bank: "BigBank",
      name: "BigBankName",
      account_number: 1234567,
      currency: "EUR"
    });
    var collection = {
      url: "/api/banks"
    };
    this.bankAccount.collection = collection;
  });

  describe("when instantiated", function() {

    it("should exhibit attributes", function() {
      expect(this.bankAccount.get('bank')).toEqual("BigBank");
      expect(this.bankAccount.get('name')).toEqual("BigBankName");
      expect(this.bankAccount.get('account_number')).toEqual(1234567);
      expect(this.bankAccount.get('currency')).toEqual("EUR");
    });
  });

  describe("urls", function() {

    describe("when no id is set", function() {
      it("should return the collection URL", function() {
        expect(this.bankAccount.url()).toEqual("/api/banks");
      });
    });

    describe("when id is set", function() {
      it("should return the collection URL and id", function() {
        this.bankAccount.id = 1;
        expect(this.bankAccount.url()).toEqual("/api/banks/1");
      });
    });
  });

  describe("when saving", function() {

    beforeEach(function() {
      this.server = sinon.fakeServer.create();
      this.responseBody = '{"account_number":53424666,"bank":"asdfasdf","created_at":"2012-05-09T08:20:51Z","currency":"EUR","description":"","id":1,"initial_cents":0,"name":"BigBank","updated_at":"2012-06-27T14:48:00Z","opening_balance":0.0}';
      this.server.respondWith(
        "POST",
        "/api/banks",
        [
          200,
          {"Content-Type": "application/json"},
          this.responseBody
        ]
      );
      this.eventSpy = sinon.spy();
    });

    afterEach(function() {
      this.server.restore();
    });

    // it("should not save when title is empty", function() {
    //   this.bankAccount.bind("error", this.eventSpy);
    //   this.bankAccount.save({"account_number": ""});

    //   expect(this.eventSpy).toHaveBeenCalledOnce();    
    //   expect(this.eventSpy).toHaveBeenCalledWith(this.bankAccount, "cannot have an empty title");
    // });

    it("should make a save request to the server", function() {
      console.log("##################");
      this.bankAccount.save();
      expect(this.server.requests[0].method).toEqual("POST");
      expect(this.server.requests[0].url).toEqual("/api/banks");
      console.log(this.bankAccount.attributes);
      console.log("check2", this.server.requests[0]);
      expect(JSON.parse(this.server.requests[0].requestBody).bank_account).toEqual(this.bankAccount.attributes);
    });
  });
});
