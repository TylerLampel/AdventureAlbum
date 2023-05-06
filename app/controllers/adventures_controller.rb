class AdventuresController < ApplicationController
  skip_before_action :authorize

    def create
        @adventure = Adventure.new(adventure_params)
        # @adventure.location_id = params[:location_id]
    
        if @adventure.save
          render json: { message: 'Adventure uploaded successfully!' }, status: :created
        else
          render json: { errors: @adventure.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      private
    
      def adventure_params
        params.require(:adventure).permit(:title, :vacation_id, :location_id, images: [])
      end
end
