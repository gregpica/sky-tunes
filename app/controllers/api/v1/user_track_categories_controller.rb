class Api::V1::UserTrackCategoriesController < ApiController

  def index
    if params[:page] == "player"
      render json: UserTrackCategory.where({user_id: params[:user_id]}).select('distinct on (user_track_categories.track_id) user_track_categories.*').shuffle;
    elsif params[:page] == "index"
      render json: UserTrackCategory.where({user_id: params[:user_id]}).select('distinct on (user_track_categories.track_id) user_track_categories.*');
    end
  end

  def destroy
    user_track_categories_to_destroy = UserTrackCategory.where({user_id: params[:user_id], track_id: params[:id]})
    if user_track_categories_to_destroy.destroy_all
      render json: {success: "Track deleted successfully!"}
    else
      render json: {error: "Error: Failed to delete track!"}
    end
  end

  def edit; end

  def update
    errors = false
    user_track_params = {user_id: params[:user_id], track_id: params[:id]}
    previous_categories = UserTrackCategory.where(user_track_params).pluck(:category_id)
    selected_categories = params[:categories]
    previous_categories.each do |category_id|
      if !selected_categories.include?(category_id)
        user_track_category_to_destroy = UserTrackCategory.where({user_id: params[:user_id], track_id: params[:id], category_id: category_id}).first
        user_track_category_to_destroy.destroy
      end
    end
    selected_categories.each do |category_id|
      if !previous_categories.include?(category_id)
        new_user_track_category = UserTrackCategory.new({user_id: params[:user_id], track_id: params[:id], category_id: category_id})
        if !new_user_track_category.save
          errors = true
        end
      end
    end

    if !errors
      render json: {success: "Track edited successfully!"}
    else
      render json: {error: "Error: Something went wrong while editing your track!"}
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
