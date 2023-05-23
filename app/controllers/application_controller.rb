class ApplicationController < ActionController::API
    include ActionController::Cookies

    # Handle ActiveRecord::RecordInvalid exception by calling render_unprocessable_entity_response method
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    # Execute the authorize method before every action
    before_action :authorize

    private

    def current_user
        # Find the current user based on the user_id stored in the session
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def authorize
        # Check if the user is authorized by verifying if the user_id is present in the session
        # If not authorized, render a JSON response with a "Not Authorized" error and a status of :unauthorized
        return render json: { errors: ["Not Authorized"] }, status: :unauthorized unless session.include? :user_id
    end

    def render_unprocessable_entity_response(exception)
        # Render a JSON response with the errors from the exception's record (usually a model validation error)
        # The response has a status of :unprocessable_entity
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
