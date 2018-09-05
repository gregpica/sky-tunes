require 'rails_helper'

RSpec.describe Track, type: :model do
  describe "validations" do
    let(:track) {FactoryBot.build(:track)}
    let(:track_no_spotify_track_id) {FactoryBot.build(:track, spotify_track_id: "")}
    let(:track_no_title) {FactoryBot.build(:track, title: "")}
    let(:track_no_artist) {FactoryBot.build(:track, artist: "")}
    let(:track_no_album) {FactoryBot.build(:track, album: "")}
    let(:track_no_album_cover) {FactoryBot.build(:track, album_cover: "")}
    let(:track_no_duration) {FactoryBot.build(:track, duration: "")}

    it "is valid with all fields required filled in" do
      expect(track).to be_valid
    end
    it "is invalid if spotify_track_id is not specified" do
      expect(track_no_spotify_track_id).to_not be_valid
    end
    it "is invalid if title is not specified" do
      expect(track_no_title).to_not be_valid
    end
    it "is invalid if artist is not specified" do
      expect(track_no_artist).to_not be_valid
    end
    it "is invalid if album is not specified" do
      expect(track_no_album).to_not be_valid
    end
    it "is invalid if album_cover is not specified" do
      expect(track_no_album_cover).to_not be_valid
    end
    it "is invalid if duration is not specified" do
      expect(track_no_duration).to_not be_valid
    end

  end
end
