class VacationsController < ApplicationController
    skip_before_action :authorize

    def index
        vacations = current_user.vacations
        render json: vacations, include: [:adventures, :locations], status: :ok
    end

    def create
        vacation = current_user.vacations.create!(vacation_params)
        render json: vacation, status: :created
    end

    def update
        vacation = Vacation.find(params[:id])
        vacation.update!(vacation_params)
        render json: vacation
    end

    def destroy
        vacation = Vacation.find(params[:id])
        vacation.destroy
        head :no_content
    end

    private

    def vacation_params
        params.require(:vacation).permit(:title, :departure_date, :return_date, :user_id)
    end

    def render_not_found_response
        return render json: { error: "Vacation not found"}, status: :not_found
    end
end
