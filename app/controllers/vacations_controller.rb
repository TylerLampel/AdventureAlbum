class VacationsController < ApplicationController
    skip_before_action :authorize
  
    def index
      # Retrieve vacations associated with the current user
      vacations = current_user.vacations
  
      # Render vacations as JSON in the response, including associated adventures and locations
      render json: vacations, include: [:adventures, :locations], status: :ok
    end
  
    def create
      # Create a new vacation associated with the current user using the provided parameters
      vacation = current_user.vacations.create!(vacation_params)
  
      # Render the created vacation as JSON in the response
      render json: vacation, status: :created
    end
  
    def update
      # Find the vacation by its ID
      vacation = Vacation.find(params[:id])
  
      # Update the vacation attributes with the provided parameters
      vacation.update!(vacation_params)
  
      # Render the updated vacation as JSON in the response
      render json: vacation
    end
  
    def destroy
      # Find the vacation by its ID
      vacation = Vacation.find(params[:id])
  
      # Delete the vacation from the database
      vacation.destroy
  
      # Return a 204 No Content status
      head :no_content
    end
  
    private
  
    def vacation_params
      # Allow only the necessary parameters for vacation creation/update
      params.require(:vacation).permit(:title, :departure_date, :return_date, :user_id)
    end
  
    def render_not_found_response
      # Render a JSON response with an error message when a vacation is not found
      return render json: { error: "Vacation not found" }, status: :not_found
    end
end
