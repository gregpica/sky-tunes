require 'rails_helper'

RSpec.describe UserTrackCategory, type: :model do
  describe "validations" do
    it { should belong_to :category }
    it { should belong_to :track }
    it { should have_valid(:user_id).when("gpica") }
    it { should_not have_valid(:user_id).when("") }
  end
end
