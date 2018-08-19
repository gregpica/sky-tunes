class UserTrackCategorySerializer < ActiveModel::Serializer
  attributes :id,
   :user_id,
   :track

  def track
    {
      id: object.track.id,
      title: object.track.title,
      artist: object.track.artist,
      album: object.track.album,
      album_cover: object.track.album_cover,
      duration: object.track.duration,
      categories: object.track.categories.map {|category| {"id": category.id, "name": category.name}}
    }
  end
end
