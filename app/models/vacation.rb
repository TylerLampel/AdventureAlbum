class Vacation < ApplicationRecord
  belongs_to :user
  has_many :adventures, dependent: :destroy
  has_many :locations, through: :adventures

  validates :title, :departure_date, :return_date, presence: true 
  validates :title, :departure_date, :return_date, uniqueness: true

  validate :validate_departure_date_before_return_date

  private

  def validate_departure_date_before_return_date
    return unless departure_date && return_date

    if departure_date > return_date
      errors.add(:departure_date, "must be before the return date")
      errors.add(:return_date, "must be after the departure date")
    end
  end
end
