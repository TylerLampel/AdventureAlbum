class Vacation < ApplicationRecord
  belongs_to :user
  has_many :adventures, dependent: :destroy
  has_many :locations, through: :adventures, dependent: :destroy

  validates :title, :departure_date, :return_date, presence: true 
  validates :title, :departure_date, :return_date, uniqueness: {scope: :user_id}

  validate :validate_departure_date_before_return_date

  private

  def validate_departure_date_before_return_date
    return unless departure_date && return_date

    if departure_date > return_date
      errors.add(:return_date, "must be after the departure date")
    end
  end
end
