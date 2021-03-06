class Api::V1::LoginController < ApiController

#include state param when you figure out what it is
#include scope param later (WILL MAKE SHOW_DIALOG WORK)
  def index
    if Rails.env.production?
      redirect_uri = ENV['REDIRECT_URI_PRODUCTION']
    else
      redirect_uri = ENV['REDIRECT_URI_DEVELOPMENT']
    end
    
    query_params = {
      client_id: ENV['CLIENT_ID'],
      response_type: "code",
      redirect_uri: redirect_uri,
      scope: "user-modify-playback-state user-read-playback-state user-read-currently-playing streaming app-remote-control user-read-birthdate user-read-email user-read-private",
      show_dialog: true
    }

    url = "https://accounts.spotify.com/authorize"
    redirect_to "#{url}?#{query_params.to_query}"
  end
end
