require 'rails_helper'

RSpec.describe Category, type: :model do
  before(:each) do
    load "#{Rails.root}/db/seeds.rb"
  end

  describe "validations" do
    it { should have_valid(:name).when("Sunny") }
    it { should_not have_valid(:name).when("") }
  end

  describe "#get_timezone" do
    it "returns the appropriate timezone" do
      expect(Category.get_timezone("40.2349,-74.6546")).to eq "America/New_York"
    end
  end

  describe "#get_categories" do
    it "returns an array of category ids" do
      categories = Category.get_categories("clear_day", "America/New_York")
      expect(categories.length).to be > 1
      categories.each do |category|
        expect(Category.ids.include?(category)).to eq true
      end
    end
  end

end
