require File.dirname(__FILE__) + '/../spec_helper'
 
describe TransactionsController do
  integrate_views
  
  it "index action should render index template" do
    get :index
    response.should render_template(:index)
  end
  
  it "show action should render show template" do
    transaction = Factory.create(:valid_transaction)
    get :show, :id => transaction.id
    response.should render_template(:show)
  end
  
  it "new action should render new template" do
    get :new
    response.should render_template(:new)
  end
  
  it "create action should render new template when model is invalid" do
    Factory.build(:invalid_transaction)
    post :create
    response.should render_template(:new)
  end
  
  it "create action should redirect when model is valid" do
    attributes = Factory.attributes_for(:valid_transaction)
    post :create, :transaction => attributes
    response.should redirect_to(transaction_url(assigns[:transaction]))
  end
  
  it "edit action should render edit template" do
    transaction = Factory.create(:valid_transaction)
    get :edit, :id => transaction.id
    response.should render_template(:edit)
  end
  
  it "update action should render edit template when model is invalid" do
    #Transaction.any_instance.stubs(:valid?).returns(false)
    #transaction = Factory.build(:invalid_transaction)
    #put :update, :id => transaction.id
    #response.should render_template(:edit)
  end
  
  it "update action should redirect when model is valid" do
    transaction = Factory.create(:valid_transaction)
    put :update, :id => transaction.id
    response.should redirect_to(transaction_url(assigns[:transaction]))
  end
  
  it "destroy action should destroy model and redirect to index action" do
    transaction = Factory.create(:valid_transaction)
    delete :destroy, :id => transaction.id
    response.should redirect_to(transactions_url)
    Transaction.exists?(transaction.id).should be_false
  end
end
