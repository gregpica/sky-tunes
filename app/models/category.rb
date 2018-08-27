class Category < ApplicationRecord
  validates :name, presence: true

  has_many :user_track_categories

  WEATHER_TO_CATEGORIES = {
     "clear_day" => ["Sunny"],
     "clear_night" => [],
     "rain" => ["Rain"],
     "snow" => ["Snow"],
     "sleet" => ["Rain", "Snow"],
     "wind" => ["Cloudy"],
     "fog" => ["Cloudy"],
     "cloudy" => ["Cloudy"],
     "partly_cloudy_day" => ["Cloudy", "Sunny"],
     "partly_cloudy_night" => []
  }

  def self.get_categories(weather)
    Category.where(name: WEATHER_TO_CATEGORIES[weather]).ids
  end
end

# "Sunny",
# "Snow",
# "Rain",
# "Cloudy",
# "Morning",
# "Afternoon",
# "Evening",
# "Night"
