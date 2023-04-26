class Adventure < ApplicationRecord
  belongs_to :vacation
  belongs_to :location
  has_many_attached :images do |attachable|
    attachable.variant :thumb, resize_to_limit: [200, 200]
  end
end
