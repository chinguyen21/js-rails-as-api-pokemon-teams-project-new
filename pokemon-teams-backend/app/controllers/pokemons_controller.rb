class PokemonsController < ApplicationController
  
  def index
    pokemons = Pokemon.all
    render json: pokemons, except: [:created_at, :updated_at] 
  end

  def show 
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon, except: [:created_at, :updated_at]
  end


  def create
    pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: pokemon_params[:trainer_id])
    render json: pokemon, except: [:created_at, :updated_at]
  end

  def destroy
    Pokemon.destroy(params[:id])
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end


end
