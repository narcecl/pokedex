export default {
	googleAnalytics: function( context, { pageTitle, pageLocation }){
		if( !gtag ) return; // eslint-disable-line no-undef

		gtag( 'event', 'page_view', { // eslint-disable-line no-undef
			page_title: pageTitle,
			page_path: pageLocation
		});
	},
	getAllPokemons: async function( context, region ){
		const { offset, limit } = region;
		const response = await this.$axios( 'https://pokeapi.co/api/v2/pokemon', {
			params: {
				offset: offset,
				limit: limit
			}
		}).catch( error => console.error( 'getAllPokemons =>', error ));

		if( response.data && response.data?.results ){
			this.commit( 'SET_CURRENT_REGION', region );
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
								names: response.data.names,
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
	getEvolutionChain: async function( context, url ){
		const evolutionChain = await this.$axios( url )
			.catch( error => console.error( 'getEvolutionChain =>', error ));

		if( evolutionChain ){
			let evoData = evolutionChain.data?.chain;
			const evoChain = [];

			if( evoData ){
				do {
					const evoDetails = evoData.evolution_details[0];
					const numberOfEvolutions = evoData.evolves_to.length;

					evoChain.push({
						species_name: evoData.species.name,
						min_level: !evoDetails ? 1 : evoDetails.min_level,
						trigger_name: !evoDetails ? null : evoDetails.trigger.name,
						item: !evoDetails ? null : evoDetails.item,
						require_hapiness: !evoDetails ? false : evoDetails.min_happiness > 0,
						known_move: !evoDetails ? false : evoDetails?.known_move?.name
					});

					if( numberOfEvolutions > 1 ){
						for( let i = 1; i < numberOfEvolutions; i++ ){
							evoChain.push({
								species_name: evoData.evolves_to[i].species.name,
								min_level: !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].min_level,
								trigger_name: !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
								item: evoData.evolves_to[i].evolution_details[0].trigger.name === 'level-up' ? null : evoData.evolves_to[i].evolution_details[0].item?.name,
								require_hapiness: evoData.evolves_to[i].evolution_details[0].min_happiness
							});
						}
					}

					evoData = evoData.evolves_to[0];
				} while( !!evoData && evoData.hasOwnProperty( 'evolves_to' )); // eslint-disable-line no-prototype-builtins

				if( evoChain.length ){
					await Promise.allSettled(
						evoChain.map( item => {
							return this.$axios( `https://pokeapi.co/api/v2/pokemon/${item.species_name}` ).then( response => {
								if( response.data ){
									const pokemon = response.data;
									const pokemonFound = evoChain.findIndex( item => item.species_name === pokemon.name );
									if( pokemonFound !== -1 ){
										evoChain[pokemonFound] = {
											...evoChain[pokemonFound],
											id: response.data.id,
											sprites: response.data.sprites
										};
									}
								}
							});
						})
					);

					return evoChain;
				}
			}
		}

		return null;
	},
	getAbilities: async function( context, abilities ){
		const fullAbilities = [];

		await Promise.allSettled(
			abilities.map( item => {
				let ability = {
					is_hidden: item.is_hidden,
					name: item.ability.name,
					url: item.ability.url,
					slot: item.slot
				};

				return this.$axios( ability.url ).then( response => {
					if( response.data ){
						ability = {
							...ability,
							names: response.data.names,
							effect_entries: response.data.flavor_text_entries,
							effect_changes: response.data.effect_changes
						};
						fullAbilities.push( ability );
					}
				});
			})
		);

		fullAbilities.sort(( a, b ) => ( a.slot > b.slot ) ? 1 : (( b.slot > a.slot ) ? -1 : 0 ));
		return fullAbilities;
	}
};
