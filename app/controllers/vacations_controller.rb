class VacationsController < ApplicationController
    skip_before_action :authorize

    def index
        vacations = current_user.vacations
        render json: vacations, include: :photos, status: :ok
    end
    
    def show
        vacation = current_user.vacations.find(params[:id])
        render json: vacation, status: :ok
    end

    def create
        vacation = current_user.vacations.create!(vacation_params)
        render json: vacation, status: :created
    end

    def update
        vacation = current_user.vacations.find(params[:id])
        vaction.update(vacation_params)
        render json: vacation
    end

    def destroy
        vacation = Vacation.find(params[:id])
        vacation.destroy
        head :no_content
    end

    private

    def vacation_params
        params.permit(:title, :departure_date, :return_date)
    end

    def render_not_found_response
        return render json: { error: "Vacation not found"}, status: :not_found
    end
end
