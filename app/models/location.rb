class Location < ApplicationRecord
  has_many :adventures
  has_many :vacations, through: :adventures
end
