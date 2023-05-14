class VacationSerializer < ActiveModel::Serializer
  attributes :id, :title, :departure_date, :return_date
  has_many :adventures
  has_many :locations, through: :adventures

  def departure_date
    object.departure_date.strftime('%m-%d-%Y')
  end

  def return_date
    object.return_date.strftime('%m-%d-%Y')
  end
  
end
