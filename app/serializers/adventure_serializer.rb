class AdventureSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :vacation
end
