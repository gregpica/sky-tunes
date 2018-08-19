class Api::V1::UserTrackCategoriesController < ApiController

  def index
    render json: UserTrackCategory.where({user_id: params[:user_id]}).select('distinct on (user_track_categories.track_id) user_track_categories.*');
  end

  def destroy
    user_track_categories_to_destroy = UserTrackCategory.where({user_id: params[:user_id], track_id: params[:id]})
    if user_track_categories_to_destroy.destroy_all
      render json: {success: "Track deleted successfully!"}
    else
      render json: {error: "Error: Failed to delete track!"}
    end
  end

  def create
    errors = false
    categories = params[:categories]
    new_track = Track.find_or_create_by!(
      spotify_track_id: params[:spotify_track_id],
      title: params[:title],
      artist: params[:artist],
      album: params[:album],
      album_cover: params[:album_cover],
      duration: params[:duration]
    )
    user_track_category_params = {user_id: params[:user_id], track_id: new_track.id}

    categories.each do |category_id|
      user_track_category_params.merge!(category_id: category_id)
      new_user_track_category = UserTrackCategory.new(user_track_category_params)
      if !new_user_track_category.save!
        errors = true
      end
    end

    if !errors
      render json: {success: "Track saved successfully!"}
    else
      render json: {error: "Error: Your track failed to save to one or more categories!"}
    end
  end


end
