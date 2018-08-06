class Api::V1::UserController < ApiController

  def create
    body = {
      grant_type: "authorization_code",
      code: user_params[:code],
      redirect_uri: ENV['REDIRECT_URI'],
      client_id: ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET']
    }

    auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
    body = JSON.parse(auth_response.body)
    render json: body
  end

  def user_params
    params
      .permit(
        :code
      )
  end

end
