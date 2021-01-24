Rails.application.routes.draw do

  # get "/pokemons/new", to: 'pokemons#new', as: 'new'
  patch "/pokemons", to: 'pokemons#create', as: 'create'
  
  
  resources :pokemons
  resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
