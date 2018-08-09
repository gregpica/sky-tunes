class UserTrackCategory < ApplicationRecord
  validates :user_id, presence: true
  validates :track_id, presence: true
  
  belongs_to :category
end
