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

  def self.get_timezone(coordinates)
    coordinates_split = coordinates.split(',')
    latitude = coordinates_split[0].to_f
    longitude = coordinates_split[1].to_f
    time_zone = Timezone.lookup(latitude,longitude)
    time_zone.name
  end

  def self.get_categories(weather, time_zone)
    categories = Category.where(name: WEATHER_TO_CATEGORIES[weather]).ids
    current_hour = Time.now.in_time_zone(time_zone).strftime("%H").to_i
    if current_hour >= 5 && current_hour < 12
      categories.concat(Category.where(name: "Morning").ids)
    elsif current_hour >= 12 && current_hour < 17
      categories.concat(Category.where(name: "Afternoon").ids)
    elsif current_hour >= 17 && current_hour < 21
      categories.concat(Category.where(name: "Evening").ids)
    else
      categories.concat(Category.where(name: "Night").ids)
    end
  end

end
