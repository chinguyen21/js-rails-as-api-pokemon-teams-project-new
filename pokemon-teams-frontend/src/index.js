const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



document.addEventListener('DOMContentLoaded', () => {
  getTrainers();
})

list_trainers = []
const getTrainers = async () => {
  const res = await fetch(TRAINERS_URL);
  const trainers = await res.json();
  list_trainers = trainers
  trainers.forEach(renderTrainer);

}

const renderTrainer = (trainer) => {
  let main = document.querySelector('main')

  let div = document.createElement('div')
  div.className = "card"
  div.setAttribute('data-id' , trainer.id); 

  let p = document.createElement('p')
  p.innerText = trainer.name

  let button = document.createElement('button')
  button.setAttribute('data-trainer-id', trainer.id)
  button.innerText = "Add Pokemon"

  button.addEventListener('click', (e) => {
    e.preventDefault()
    if (ul.children.length < 6 && e.detail == 1) {
      addPokemon(trainer, ul)
    } 
  })

  let ul = document.createElement('ul')
  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, ul))
  

  div.append(p, button, ul)
  main.appendChild(div)

}

const renderPokemon = (pokemon, ul) => {
    let li = document.createElement('li')
    li.innerText = pokemon.nickname

    let release_button = document.createElement('button')
    release_button.className = "release"
    release_button.setAttribute('data-pokemon-id', pokemon.id)
    release_button.innerText = "Release"
    release_button.addEventListener('click', (event) => deletePokemon(pokemon,event))

    li.appendChild(release_button)
    ul.appendChild(li)
}

const deletePokemon = (pokemon, event) => {
  event.preventDefault()
  fetch(POKEMONS_URL+`/${pokemon.id}`, {
    method: "DELETE"
  })
  .then(event.target.parentElement.remove())

}


const addPokemon = (trainer, ul) => {
  newPokemon = {
    trainer_id: trainer.id
  }

  fetch(POKEMONS_URL, {
    headers: {'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify(newPokemon)
  })
  .then(res => res.json())
  .then(pokemon => renderPokemon(pokemon, ul))

}

