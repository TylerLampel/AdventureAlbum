class LocationsController < ApplicationController
    skip_before_action :authorize

    def index
        locations = Locations
        render json: locations, include: :adventures, status: :ok
    end
    
    def show
        location = Locations.find(params[:id])
        render json: location, include: :adventures, status: :ok
    end

    def create
        location = Location.create!(location_params)
        render json: location, status: :created
    end

    def update
        location = Location.find(params[:id])
        location.update(location_params)
        render json: location
    end

    def destroy
        location = Location.find(params[:id])
        location.destroy
        head :no_content
    end

    private

    def location_params
        params.permit(:title, :departure_date, :return_date)
    end
end
