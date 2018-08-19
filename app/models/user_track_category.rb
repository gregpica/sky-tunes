class UserTrackCategory < ApplicationRecord
  validates :user_id, presence: true

  belongs_to :category
  belongs_to :track, primary_key: 'spotify_track_id'
end
