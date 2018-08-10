class CreateUserTrackCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :user_track_categories do |t|
      t.string :user_id, null: false 
      t.string :track_id, null: false
      t.belongs_to :category

      t.timestamps null: false
    end
  end
end
