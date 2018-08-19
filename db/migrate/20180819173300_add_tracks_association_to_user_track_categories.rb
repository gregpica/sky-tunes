class AddTracksAssociationToUserTrackCategories < ActiveRecord::Migration[5.2]
  def change
    change_table :user_track_categories do |t|
      t.belongs_to :track, :primary_key => "spotify_track_id", :type => "string"
    end
  end
end
