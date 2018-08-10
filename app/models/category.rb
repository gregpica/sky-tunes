class Category < ApplicationRecord
  validates :name, presence: true

  has_many :user_track_categories
end
