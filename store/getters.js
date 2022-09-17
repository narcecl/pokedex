export default {
	getTypeInfo: (state) => (type) => {
		const typeFound = state.pokemonTypes.find( el => el.name === type );
		if( typeFound ) return typeFound.damage_relations;
	},
	getLocaleTypeName: (state) => ({lang, type}) => {
		const typeFound = state.pokemonTypes.find( el => el.name === type );
		if( typeFound ){
			const locale = typeFound.names.find( el => el.language.name === lang );
			if( locale ) return locale.name;
		}
		return type;
	},
	getRegionNames: (state) => {
		const actives = state.regions.filter( item => item.active );
		return actives.map( item => ({ name: item.name, slug: item.slug }) );
	}
};
