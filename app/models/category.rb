class Category < ApplicationRecord
  validates :name, presence: true

  has_many :user_track_categories
  belongs_to :track, primary_key: 'spotify_track_id'
end
