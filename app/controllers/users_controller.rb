class UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        session[:user_id] = user.user_id
        render json: user
    end

    def show 
        user = User.find(session[:user_id])
        render json: user
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end 
end
