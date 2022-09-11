export default {
	getTypeInfo: (state) => (type) => {
		const typeFound = state.pokemonTypes.find( el => el.name === type );
		if( typeFound ) return typeFound.damage_relations;
	}
};
