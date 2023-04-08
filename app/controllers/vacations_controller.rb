class VacationsController < ApplicationController
    def index
        vacations = @current_user.vacations
        render json: vacations, status: :ok
    end
    
    def show
        vacation = @current_user.vacations.find(params[:id])
        render json: vaction, status: :ok
    end

    def create
        vacation = @current_user.vacations.create!(vacation_params)
        render json: vacation, status: :created
    end

    def update
        vacation = @current_user.vacations.find(params[:id])
        vaction.update(vacation_params)
        render json: vaction
    end

    def destroy
        vaction = Vacation.find(params[:id])
        vacation.destroy
        head :no_content
    end

    private

    def vacation_params
        params.require(:vacation).permit(:title, :departure_date, :return_date , uploads: [])
    end
end
