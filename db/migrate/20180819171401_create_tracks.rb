class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks, { id: false, primary_key: :spotify_track_id } do |t|
      t.string :spotify_track_id, null: false
      t.string :title, null: false
      t.string :artist, null: false
      t.string :album, null: false
      t.string :album_cover, null: false
      t.string :duration, null: false

      t.timestamps null: false
    end
    add_index :tracks, :spotify_track_id, unique: true
  end
end
