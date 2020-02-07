class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
  
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, PATCH, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end

  def login!
    session[:user_id] = @user.id
  end
  
  def logged_in?
      !!session[:user_id]
  end
  
  def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def authorized_user?
      @user == current_user
  end
  
  def logout!
      session.clear
  end
end
