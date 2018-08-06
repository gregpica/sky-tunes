Rails.application.routes.draw do
  root 'login#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :login, only: [:index]
  resources :callback, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :login, only: [:index]
      resources :user, only: [:create]
    end
  end

end
