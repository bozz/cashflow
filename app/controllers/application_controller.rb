# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  before_filter :instantiate_controller_and_action_names
  
  include Authentication
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
  
  private
    
    def instantiate_controller_and_action_names
      @current_action = action_name
      @current_controller = controller_name
    end
  
    # helper method for using acts_as_taggable_on together with formtastic. Tags are returned from 
    # form as :tag_ids - controller will not save these properly, instead I map the IDs to their
    # repective tag.name - then use :tag_list to save them. Using before_filter to call this method.
    # TODO: see if there is a better way to do this ! 
    def get_tag_list(params)
      params[:tag_ids].delete_if { |item| item.nil? || item.blank? } # remove empty elements
      params[:tag_list] = params[:tag_ids].map { |id| Tag.find(id).name } # get tag names for ids
      params.delete(:tag_ids)
    end
    
end
