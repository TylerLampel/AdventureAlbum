class Photo < ApplicationRecord
  belongs_to :vacation
  has_one_attached :image
end
