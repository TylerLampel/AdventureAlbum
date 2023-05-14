class AdventuresController < ApplicationController
  skip_before_action :authorize

    def create
        @adventure = Adventure.create!(adventure_params)
        render json: @adventure, status: :created
    end
    
      private
    
      def adventure_params
        params.require(:adventure).permit(:title, :vacation_id, :location_id, images: [])
      end
end
