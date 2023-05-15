Rails.application.routes.draw do
  resources :locations, only: [:create]
  resources :vacations, only: [:index, :destroy, :create, :update] do
    resources :adventures, only: [:create]
  end
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
