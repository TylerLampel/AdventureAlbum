class PhotosController < ApplicationController
    skip_before_action :authorize

    def index
        vacation = Vacation.find(params[:vacation_id])
        photos = vacation.photos
        render json: photos
    end

    def create
        vacation = Vacation.find(params[:vacation_id])
        photo = vacation.photos.create(photo_params)
        render json: photo, status: :created
    end

    private

    def photo_params
        params.require(:photo).permit(:title, :vacation_id, :image)
    end
end
