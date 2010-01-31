class <%= user_plural_class_name %>Controller < ApplicationController
  #before_filter :require_no_user, :only => [:new, :create]
  before_filter :login_required, :only => [:show, :edit, :update]

  def new
    @<%= user_singular_name %> = <%= user_class_name %>.new
  end
  
  def create
    @<%= user_singular_name %> = <%= user_class_name %>.new(params[:<%= user_singular_name %>])
    if @<%= user_singular_name %>.save
      flash[:notice] = "Thank you for signing up! You are now logged in."
      redirect_to root_url
      #redirect_back_or_default account_url
    else
      render :action => :new
    end
  end

  def show
    @<%= user_singular_name %> = @current_user
  end

  def edit
    @<%= user_singular_name %> = @current_user
  end

  def update
    @<%= user_singular_name %> = @current_user # makes our views "cleaner" and more consistent
    if @<%= user_singular_name %>.update_attributes(params[:<%= user_singular_name %>])
      flash[:notice] = "Account updated!"
      redirect_to root_url
      #redirect_to account_url
    else
      render :action => :edit
    end
  end
end
