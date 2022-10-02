export default {
	getTypeInfo: (state) => (type) => {
		if( state.pokemonTypes.length ){
			const typeFound = state.pokemonTypes.find( el => el.name === type );
			if( typeFound ) return typeFound.damage_relations;
		}
	},
	getGenerationInfo: (state) => (name) => {
		const generationFound = state.regions.find( el => el.code === name );
		if( generationFound ){
			let generationCode = generationFound.code.split('-');
			return {
				name: generationFound.name,
				slug: generationFound.slug,
				code: `Gen ${generationCode[1].toUpperCase()}`
			};
		}
	},
	getLocaleTypeName: (state) => ({lang, type}) => {
		const typeFound = state.pokemonTypes.find( el => el.name === type );
		if( typeFound ){
			const locale = typeFound.names.find( el => el.language.name === lang );
			if( locale ) return locale.name;
		}
		return type;
	},
	getPokemonByQuery: (state) => (query) => {
		if( !query  ) return [];
		const pokemons = state.allPokemons.filter( el => el.name.includes(query) || el.id === Number(query) );
		return pokemons.length ? pokemons : [];
	},
	getRegionNames: (state) => {
		const actives = state.regions.filter( item => item.active );
		return actives.map( item => ({ name: item.name, slug: item.slug, code: item.code }) );
	},
	isFavorite: (state) => (specie_name) => {
		const found = state.favoritesPokemons.find( item => item.pokemon_species.name === specie_name ) || false;
		return (typeof found === 'object');
	}
};
