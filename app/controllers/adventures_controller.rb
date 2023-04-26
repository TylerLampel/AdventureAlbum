class AdventuresController < ApplicationController

    def index
        vacation = Vacation.find_by(id: params[:vacation_id])
        adventures = vacation.adventures
        render json: adventures
    end

    def show
        @adventure = Adventure.find(params[:id])
        render json: @adventure.as_json( include: :images)
      end

    def create
        @adventure = Adventure.new(adventure_params)
    
        if @adventure.save
          render json: { message: 'Adventure uploaded successfully!' }, status: :created
        else
          render json: { errors: @adventure.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      private
    
      def adventure_params
        params.require(:adventure).permit(:title, :description, :vacation_id, :location_id images: [])
      end
end
