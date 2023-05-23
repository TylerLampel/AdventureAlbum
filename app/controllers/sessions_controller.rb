class SessionsController < ApplicationController
    skip_before_action :authorize

    def create
        # Find the user by their username in the database
        user = User.find_by(username: params[:username])

        if user&.authenticate(params[:password])
            # If the user is found and the provided password is correct
            # Set the user's id in the session to establish the session
            session[:user_id] = user.id

            # Render the user as JSON with a '201 Created' status
            render json: user, status: :created
        else
            # If the user is not found or the password is incorrect
            # Render an error message as JSON with a '401 Unauthorized' status
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    def destroy
        # Delete the user id from the session to end the session
        session.delete :user_id

        # Send a '204 No Content' response indicating successful deletion
        head :no_content
    end
end
