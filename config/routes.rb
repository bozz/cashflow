Cashflow::Application.routes.draw do
  get "main/index"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  scope 'api' do
    get    'accounts'     => 'Account#list'
    post   'accounts'     => 'Account#create'
    get    'accounts/:id' => 'Account#show'
    put    'accounts/:id' => 'Account#update'
    delete 'accounts/:id' => 'Account#delete'

    # get    'bank-accounts'     => 'BankAccount#list'
    # post   'bank-accounts'     => 'BankAccount#create'
    # get    'bank-accounts/:id' => 'BankAccount#show'
    # put    'bank-accounts/:id' => 'BankAccount#update'
    # delete 'bank-accounts/:id' => 'BankAccount#delete'

    get    'banks'     => 'BankAccount#list'
    post   'banks'     => 'BankAccount#create'
    get    'banks/:id' => 'BankAccount#show'
    put    'banks/:id' => 'BankAccount#update'
    delete 'banks/:id' => 'BankAccount#delete'

    get    'banks/:bank_id/transactions'     => 'BankTransaction#list'
    post   'banks/:bank_id/transactions'     => 'BankTransaction#create'
    get    'banks/:bank_id/transactions/:id' => 'BankTransaction#show'
    put    'banks/:bank_id/transactions/:id' => 'BankTransaction#update'
    delete 'banks/:bank_id/transactions/:id' => 'BankTransaction#delete'
    post   'banks/:bank_id/transactions/import' => 'BankTransaction#import'

    # get    'bank-transactions'     => 'BankTransaction#list'
    # post   'bank-transactions'     => 'BankTransaction#create'
    # get    'bank-transactions/:id' => 'BankTransaction#show'
    # put    'bank-transactions/:id' => 'BankTransaction#update'
    # delete 'bank-transactions/:id' => 'BankTransaction#delete'
    # post   'bank-transactions/import' => 'BankTransaction#import'
  end

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'main#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
