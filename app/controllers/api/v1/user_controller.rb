class Api::V1::UserController < ApiController

  def create
    if Rails.env.production?
      redirect_uri = ENV['REDIRECT_URI_PRODUCTION']
    else
      redirect_uri = ENV['REDIRECT_URI_DEVELOPMENT']
    end

    if params[:code]
      body = {
        grant_type: "authorization_code",
        code: params[:code],
        redirect_uri: redirect_uri,
        client_id: ENV['CLIENT_ID'],
        client_secret: ENV['CLIENT_SECRET']
      }
    elsif params[:refresh_token]
      body = {
        grant_type: "refresh_token",
        refresh_token: params[:refresh_token],
        client_id: ENV['CLIENT_ID'],
        client_secret: ENV['CLIENT_SECRET']
      }
    end

    auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
    response_body = JSON.parse(auth_response.body)
    if params[:refresh_token]
      response_body["refresh_token"] = params[:refresh_token]
    end
    render json: response_body
  end
end
