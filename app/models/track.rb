class Track < ApplicationRecord
  self.primary_key = "spotify_track_id"

  validates :spotify_track_id, presence: true
  validates :title, presence: true
  validates :artist, presence: true
  validates :album, presence: true
  validates :album_cover, presence: true
  validates :duration, presence: true

  has_many :user_track_categories
  has_many :categories, through: :user_track_categories
end
