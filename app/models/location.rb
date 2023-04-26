class Location < ApplicationRecord
  belongs_to :adventure
  has_many :vacations, through: :adventures
end
