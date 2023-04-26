Rails.application.routes.draw do
  resources :locations
  resources :vacations, only: [:index, :show, :create] do
    resources :adventures, only: [:index, :create]
  end

  resources :adventures, only: [:show, :update, :destroy]
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
