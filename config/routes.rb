Rails.application.routes.draw do
  root 'login#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :login, only: [:index]
  resources :callback, only: [:index]
  resources :track_player,  :path => '/track-player', only: [:index]
  resources :tracks

  namespace :api do
    namespace :v1 do
      resources :login, only: [:index]
      resources :user, only: [:create] do
        resources :user_track_category, only: [:create, :index]
      end
      resources :categories, only: [:index]
    end
  end

end
