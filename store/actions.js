export default {
	googleAnalytics: function( context, { pageTitle, pageLocation }){
		if( !gtag ) return; // eslint-disable-line no-undef

		gtag( 'event', 'page_view', { // eslint-disable-line no-undef
			page_title: pageTitle,
			page_path: pageLocation
		});
	},
	getAllPokemons: async function( context, url = 'https://pokeapi.co/api/v2/pokemon' ){
		const response = await this.$axios( url, {
			params: {
				limit: this.state.limit,
				offset: this.state.offset
			}
		}).catch( error => console.error( 'getAllPokemons =>', error ));

		if( response.data && response.data?.results ){
			this.dispatch( 'getPokemonTypes' );
			return this.dispatch( 'getPokemonsInfo', response.data.results );
		}
	},
	getPokemonsInfo: async function( context, result ){
		const pokemons = [];

		await Promise.allSettled(
			result.map( pokemonItem => {
				return this.$axios( `https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}` )
					.then( response => {
						pokemons.push( response.data );
					});
			})
		);

		pokemons.sort(( a, b ) => ( a.id > b.id ) ? 1 : (( b.id > a.id ) ? -1 : 0 ));
		return pokemons;
	},
	getPokemonTypes: async function( context ){
		const response = await this.$axios( 'https://pokeapi.co/api/v2/type/' )
			.catch( error => console.error( 'getPokemonTypes =>', error ));

		if( response.data && response.data?.results ){
			const results = response.data.results;
			const types = [];

			await Promise.allSettled(
				results.map( item => {
					return this.$axios( item.url ).then( response => {
						if( response.data && response.data?.damage_relations ){
							types.push({
								name: item.name,
								damage_relations: response.data.damage_relations
							});
						}
					});
				})
			);

			context.commit( 'SET_POKEMON_TYPES', types );
		}
	},
	getSpecie: function( context, id ){
		return this.$axios( `https://pokeapi.co/api/v2/pokemon-species/${id}` )
			.then( specie => {
				return specie.data;
			})
			.catch( error => console.error( 'getSpecie =>', error ));
	},
	getEvolutionChain: function( context, url ){
		return this.$axios( url )
			.then( evolutionChain => {
				let evoData = evolutionChain.data?.chain;

				if( evoData ){
					const evoChain = [];
					const canEvolve = evoData.evolves_to.length;

					if( canEvolve ){
						do {
							const evoDetails = evoData.evolution_details[0];

							evoChain.push({
								species_name: evoData.species.name,
								min_level: !evoDetails ? 1 : evoDetails.min_level,
								trigger_name: !evoDetails ? null : evoDetails.trigger.name,
								item: !evoDetails ? null : evoDetails.item
							});

							evoData = evoData.evolves_to[0];
						} while( !!evoData && evoData.hasOwnProperty( 'evolves_to' )); // eslint-disable-line no-prototype-builtins
					}

					console.info( 'evoChain =>', evoChain );
					return evoChain;
				}
			})
			.catch( error => console.error( 'getEvolutionChain =>', error ));
	}
};
