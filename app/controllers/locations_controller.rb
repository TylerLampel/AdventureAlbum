class LocationsController < ApplicationController
    skip_before_action :authorize

    def create
        # Create a new location record with the parameters from the request
        location = Location.create!(location_params)

        # Render the created location as JSON with a '201 Created' status
        render json: location, status: :created
    end

    private

    def location_params
        # Define the permitted parameters for creating a location
        params.require(:location).permit(:name)
    end
end
