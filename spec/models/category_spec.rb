require 'rails_helper'

RSpec.describe Category, type: :model do

  describe "validations" do
    it { should have_valid(:name).when("Sunny") }
    it { should_not have_valid(:name).when("") }
  end

  describe "#get_timezone" do
    it "returns the appropriate timezone" do
      expect(Category.get_timezone("40.2349,-74.6546")).to eq "America/New_York"
    end
  end

end
