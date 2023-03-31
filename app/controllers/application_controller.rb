class ApplicationController < ActionController::API
    include ActionController::Cookies

    before_action :authorize

    private

    def current_user
        @current_user ||= session[:user_id] &&
        User.find_by(id: session[:user_id])
    end

    def authorize
        return render json: { errors: ["Not Authorized"] }, status: :unauthorized unless session.include? :user_id
    end
end
