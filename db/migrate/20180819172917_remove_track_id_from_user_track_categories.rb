class RemoveTrackIdFromUserTrackCategories < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_track_categories, :track_id, :string
  end
end
