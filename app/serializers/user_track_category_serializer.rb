class UserTrackCategorySerializer < ActiveModel::Serializer
  attributes :id,
   :user_id,
   :track_id

   belongs_to :category
end
