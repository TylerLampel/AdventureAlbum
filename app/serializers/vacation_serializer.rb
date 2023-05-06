class VacationSerializer < ActiveModel::Serializer
  attributes :id, :title, :departure_date, :return_date
  has_many :adventures
  has_many :locations, through: :adventures
  
end
