class Adventure < ApplicationRecord
  belongs_to :vacation
  has_many_attached :images
end
