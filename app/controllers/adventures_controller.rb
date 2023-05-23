class AdventuresController < ApplicationController
   # Skip authorization check
  skip_before_action :authorize

    def create
       # Create a new adventure using the adventure_params
        @adventure = Adventure.create!(adventure_params)

        # Render the created adventure as JSON with a status of :created
        render json: @adventure, status: :created
    end
    
      private
    
      def adventure_params
         # Permit the required parameters for adventure creation
         # including the title, vacation_id, location_id, and images (as an array)
        params.require(:adventure).permit(:title, :vacation_id, :location_id, images: [])
      end
end
