class Vacation < ApplicationRecord
  belongs_to :user
  has_many :adventures

  validates :title, :departure_date, :return_date, presence: true 
end
