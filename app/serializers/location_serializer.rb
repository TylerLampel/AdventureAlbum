class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :adventures
  has_many :adventures
  has_many :vacations, through: :adventures

end
