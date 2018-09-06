require 'rails_helper'

RSpec.describe Api::V1::CategoriesController, type: :controller do
  let!(:category) { FactoryBot.create(:category)}
  let!(:category_2) { FactoryBot.create(:category, name: "Rainy")}
  let!(:category_3) { FactoryBot.create(:category, name: "Night")}

  describe "GET#index" do
    it 'should return list of Category objects' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
      expect(returned_json.length).to eq 1
      expect(returned_json["categories"].length).to eq 3
      expect(returned_json["categories"][0]["name"]).to eq category.name
      expect(returned_json["categories"][1]["name"]).to eq category_2.name
      expect(returned_json["categories"][2]["name"]).to eq category_3.name
    end
  end
end
