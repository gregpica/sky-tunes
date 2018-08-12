class Api::V1::LoginController < ApiController

#include state param when you figure out what it is
#include scope param later (WILL MAKE SHOW_DIALOG WORK)
  def index
    query_params = {
      client_id: ENV['CLIENT_ID'],
      response_type: "code",
      redirect_uri: ENV['REDIRECT_URI'],
      scope: "user-modify-playback-state",
      show_dialog: true
    }

    url = "https://accounts.spotify.com/authorize"
    redirect_to "#{url}?#{query_params.to_query}"
  end
end
