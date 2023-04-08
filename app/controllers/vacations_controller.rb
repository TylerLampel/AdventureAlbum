class VacationsController < ApplicationController
    def index
        vacations = @current_user.vacations
        render json: vacations, status: :ok
    end
end
