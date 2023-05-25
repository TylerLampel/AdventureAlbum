class Adventure < ApplicationRecord
  belongs_to :vacation
  belongs_to :location
  has_many_attached :images do |attachable|
    attachable.variant :thumb, resize_to_limit: [200, 200]
    # Create a variant of the attached image with a maximum size of 200x200 pixels
  end
 
  # Validates that the adventure must have a non-empty title
  validates :title, presence: true 
 
  # Validates that at least one image must be attached to the adventure
  validates :images, presence: true
end
