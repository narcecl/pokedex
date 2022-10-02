export default {
	SET_LOADING: function( state, payload ){
		state.loading = payload;
	},
	SET_DARK: function( state, payload ){
		document.cookie = `dark_mode=${payload.toString()}; SameSite=None; Secure`;
		state.darkMode = payload;
	},
	SET_POKEMONS: function( state, payload ){
		state.allPokemons = payload;
	},
	SELECT_POKEMON: function( state, payload ){
		state.selectedPokemon = payload;
	},
	SET_POKEMON_MODAL: function( state, payload ){
		state.pokemonModal = payload;
	},
	SET_POKEMON_TYPES: function( state, payload ){
		state.pokemonTypes = payload;
	},
	SET_CURRENT_REGION: function( state, payload ){
		state.currentRegion = payload;
	},
	SET_EGG_GROUPS: function( state, payload ){
		state.eggGroups = payload;
	},
	SET_FAVORITES: function( state, payload ){
		state.favoritesPokemons = payload;
	},
	ADD_TO_FAVORITES: function( state, payload ){
		const pokemonFound = state.favoritesPokemons.findIndex( item => item.pokemon_species.name === payload.pokemon_species.name );
		console.log( 'pokemonFound =>', payload, pokemonFound );
		if( pokemonFound === -1 ) state.favoritesPokemons = [...state.favoritesPokemons, payload];
		else state.favoritesPokemons = state.favoritesPokemons.filter(( item, index ) => index !== pokemonFound );
	}
};
