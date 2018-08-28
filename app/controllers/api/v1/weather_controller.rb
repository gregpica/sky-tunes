class Api::V1::WeatherController < ApiController

  def index
    coordinates = Geocoder.search(request.remote_ip).first.data["loc"]
    api_path = "https://api.darksky.net/forecast/#{ENV['WEATHER_KEY']}/#{coordinates}"
    auth_response = RestClient.get(api_path)
    body = JSON.parse(auth_response.body)
    render json: body
  end

end
