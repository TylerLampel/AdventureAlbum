class VacationSerializer < ActiveModel::Serializer
  attributes :id, :title, :departure_date, :return_date
  has_many :photos
end
