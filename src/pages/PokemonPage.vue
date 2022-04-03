<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>

  <div v-else>

    <h1>¿Quien es este pokemon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/> <!--v-bind:---->

    <PokemonOptions :pokemons="pokemonArr"
                    @selection="checkAnswer"
    />


    <template v-if="showPokemon">
      <h2 class="fade-in">{{ message }}</h2>

      <button @click="newGame">
        Nuevo Juego
      </button>
    </template>


  </div>

</template>


<script>

import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";
import getPokemonOptions from "@/helpers/getPokemonOptions";


export default {
  components: {PokemonPicture, PokemonOptions},
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''

    }
  },

  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer(selectedId) {
      this.showPokemon = true
      if (selectedId === this.pokemon.id) {
        this.message = `Correcto! ${this.pokemon.name}`
      } else {
        this.message = `Fallaste! era ${this.pokemon.name}`

      }

    },
    newGame() {
      this.showPokemon = false
      this.showAnswer = false
      this.pokemonArr = []
      this.pokemon = null
      this.mixPokemonArray()
    }

  },
  mounted() {
    this.mixPokemonArray()
  }


}

</script>