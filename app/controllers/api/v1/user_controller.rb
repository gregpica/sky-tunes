class Api::V1::UserController < ApiController

  def create
    if Rails.env.production?
      redirect_uri = ENV['REDIRECT_URI_PRODUCTION']
    else
      redirect_uri = ENV['REDIRECT_URI_DEVELOPMENT']
    end

    body = {
      grant_type: "authorization_code",
      code: user_params[:code],
      redirect_uri: redirect_uri,
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
