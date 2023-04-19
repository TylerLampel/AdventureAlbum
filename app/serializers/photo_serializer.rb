class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :title, :image
  has_one :vacation

end
