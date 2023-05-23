class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        # Create a new user with the provided parameters
        user = User.create!(user_params)

        # Set the user's id in the session to establish the session
        session[:user_id] = user.id

        # Render the user as JSON in the response
        render json: user
    end

    def show
        # Find the user in the database based on the stored user id in the session
        user = User.find(session[:user_id])
    
        # Render the user as JSON in the response, including associated vacations
        render json: user, include: :vacations
    end
    
    private
    
    def user_params
        # Allow only the necessary parameters for user creation
        params.permit(:username, :password, :password_confirmation)
    end
 end
