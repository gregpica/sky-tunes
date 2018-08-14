class Api::V1::WeatherController < ApiController

  def index
    api_path = "https://api.darksky.net/forecast/#{ENV['WEATHER_KEY']}/42.3601,-71.0589"
    auth_response = RestClient.get(api_path)
    body = JSON.parse(auth_response.body)
    render json: body
  end

end
