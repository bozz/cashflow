class <%= session_plural_class_name %>Controller < ApplicationController
  #before_filter :require_no_user, :only => [:new, :create]
  before_filter :login_required, :only => :destroy
  
  def new
    @<%= session_singular_name %> = <%= session_class_name %>.new
  end
  
  def create
    @<%= session_singular_name %> = <%= session_class_name %>.new(params[:<%= session_singular_name %>])
    if @<%= session_singular_name %>.save
      flash[:notice] = "Logged in successfully."
      redirect_to_target_or_default(root_url)
    else
      render :action => 'new'
    end
  end
  
  def destroy
    @<%= session_singular_name %> = <%= session_class_name %>.find
    @<%= session_singular_name %>.destroy
    flash[:notice] = "You have been logged out."
    redirect_to root_url
  end
end
