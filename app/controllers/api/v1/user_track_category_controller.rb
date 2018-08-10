class Api::V1::UserTrackCategoryController < ApiController

  def create
    new_user_track_category = UserTrackCategory.new(user_track_category_params)
    if new_user_track_category.save
      render json: {success: "Track saved successfully!"}
    else
      render json: {error: "Error with saving track!"}
    end
  end

  def user_track_category_params
    params
      .permit(
        :track_id,
        :user_id,
        :category_id
      )
  end
end
