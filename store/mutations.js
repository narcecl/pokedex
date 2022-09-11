export default {
	SET_LOADING: function(state, payload) {
		state.loading = payload;
	},
	SET_DARK: function(state, payload){
		state.darkMode = payload;
	},
	SET_POKEMONS: function(state, payload){
		state.pokemons = [...state.pokemons, ...payload];
	},
	SELECT_POKEMON: function(state, payload){
		state.selectedPokemon = payload;
	},
	SET_POKEMON_MODAL: function(state, payload){
		state.pokemonModal = payload;
	},
	SET_POKEMON_TYPES: function(state, payload){
		state.pokemonTypes = payload;
	}
}