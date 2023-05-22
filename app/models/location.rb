class Location < ApplicationRecord
  has_many :adventures
  has_many :vacations, through: :adventures

  validates :name, presence: true
  validates :name, uniqueness: true
end
