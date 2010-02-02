require File.dirname(__FILE__) + '/../spec_helper'
 
describe TransactionsController do
  fixtures :all
  integrate_views
  
  it "index action should render index template" do
    get :index
    response.should render_template(:index)
  end
  
  it "show action should render show template" do
    get :show, :id => Transaction.first
    response.should render_template(:show)
  end
  
  it "new action should render new template" do
    get :new
    response.should render_template(:new)
  end
  
  it "create action should render new template when model is invalid" do
    Transaction.any_instance.stubs(:valid?).returns(false)
    post :create
    response.should render_template(:new)
  end
  
  it "create action should redirect when model is valid" do
    Transaction.any_instance.stubs(:valid?).returns(true)
    post :create
    response.should redirect_to(transaction_url(assigns[:transaction]))
  end
  
  it "edit action should render edit template" do
    get :edit, :id => Transaction.first
    response.should render_template(:edit)
  end
  
  it "update action should render edit template when model is invalid" do
    Transaction.any_instance.stubs(:valid?).returns(false)
    put :update, :id => Transaction.first
    response.should render_template(:edit)
  end
  
  it "update action should redirect when model is valid" do
    Transaction.any_instance.stubs(:valid?).returns(true)
    put :update, :id => Transaction.first
    response.should redirect_to(transaction_url(assigns[:transaction]))
  end
  
  it "destroy action should destroy model and redirect to index action" do
    transaction = Transaction.first
    delete :destroy, :id => transaction
    response.should redirect_to(transactions_url)
    Transaction.exists?(transaction.id).should be_false
  end
end
