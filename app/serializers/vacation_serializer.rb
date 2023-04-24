class VacationSerializer < ActiveModel::Serializer
  attributes :id, :title, :departure_date, :return_date, :adventures
end
