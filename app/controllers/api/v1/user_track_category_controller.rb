class Api::V1::UserTrackCategoryController < ApiController

  def create
    errors = false
    categories = params[:categories]
    user_track_category_params = {user_id: params[:user_id], track_id: params[:track_id]}

    categories.each do |category_id|
      user_track_category_params.merge!(category_id: category_id)
      new_user_track_category = UserTrackCategory.new(user_track_category_params)
      if !new_user_track_category.save
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
