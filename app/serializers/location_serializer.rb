class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :vacations
  has_many :adventures
  has_many :vacations, through: :adventures

end
