export default {
	googleAnalytics: function( context, { pageTitle, pageLocation }){
		if( !gtag ) return; // eslint-disable-line no-undef

		gtag( 'event', 'page_view', { // eslint-disable-line no-undef
			page_title: pageTitle,
			page_path: pageLocation
		});
	},
	getAllPokemons: async function( context ){
		const pokemons = await this.$axios( 'https://pokeapi.co/api/v2/pokedex/1' ).then( response => response.data.pokemon_entries )
			.catch( error => console.error( 'getAllPokemons =>', error ));

		if( !pokemons.length ) return false;
		const fullList = pokemons.map( item => ({ ...item.pokemon_species, id: item.entry_number }));
		context.commit( 'SET_POKEMONS', fullList );
	},
	getRegionalPokemons: async function( context, region ){
		const regionalPokemons = await this.$axios( `https://pokeapi.co/api/v2/pokedex/${region.dexNumber}` ).then( response => response.data.pokemon_entries )
			.catch( error => console.error( 'getRegionalPokemons =>', error ));

		if( !regionalPokemons.length ) return false;
		context.commit( 'SET_CURRENT_REGION', region );
		return regionalPokemons;
	},
	getPokemonSpecie: async function( context, name ){
		const pokemonSpecie = await this.$axios( `https://pokeapi.co/api/v2/pokemon-species/${name}` ).then( response => response.data )
			.catch( error => console.error( 'getPokemonInfo =>', error ));

		if( !pokemonSpecie ) return false;
		return pokemonSpecie;
	},
	getPokemonInfo: async function( context, id ){
		const pokemonInfo = await this.$axios( `https://pokeapi.co/api/v2/pokemon/${id}` ).then( response => response.data )
			.catch( error => console.error( 'getPokemonInfo =>', error ));

		if( !pokemonInfo ) return false;
		return pokemonInfo;
	},
	getPokemonsData: async function( context, result ){
		const pokemons = [];

		await Promise.allSettled(
			result.map( async pokemonItem => {
				const specieResponse = await context.dispatch( 'getPokemonSpecie', pokemonItem.pokemon_species.name );
				const infoResponse = await context.dispatch( 'getPokemonInfo', specieResponse.id );

				pokemons.push({
					...specieResponse,
					...infoResponse,
					entry_number: pokemonItem.entry_number,
					specie_name: specieResponse.name
				});
			})
		);

		pokemons.sort(( a, b ) => ( a.entry_number > b.entry_number ) ? 1 : (( b.entry_number > a.entry_number ) ? -1 : 0 ));
		return pokemons;
	},
	getPokemonTypes: async function( context ){
		const allTypes = await this.$axios( 'https://pokeapi.co/api/v2/type/' ).then( response => response.data.results )
			.catch( error => console.error( 'getPokemonTypes =>', error ));

		if( allTypes.length ){
			const types = [];

			await Promise.allSettled(
				allTypes.map( async type => {
					const typeDetail = await this.$axios( type.url ).then( response => response.data )
						.catch( error => console.error( 'getPokemonTypes =>', error ));

					types.push({
						name: type.name,
						names: typeDetail.names,
						damage_relations: typeDetail.damage_relations
					});
				})
			);

			context.commit( 'SET_POKEMON_TYPES', types );
		}
	},
	getEvolutionChain: async function( context, url ){
		const evolutionChain = await this.$axios( url ).then( response => response.data.chain )
			.catch( error => console.error( 'getEvolutionChain =>', error ));

		const evoChain = [];

		if( evolutionChain ){
			let evoData = { ...evolutionChain };

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
					evoChain.map( async item => {
						const pokemonSpecie = await this.$axios( `https://pokeapi.co/api/v2/pokemon-species/${item.species_name}` )
							.then( response => response.data );
						const pokemonFound = evoChain.findIndex( item => item.species_name === pokemonSpecie.name );
						const pokemonInfo = await context.dispatch( 'getPokemonInfo', pokemonSpecie.id ).then( response => response.sprites );

						evoChain[pokemonFound] = {
							...evoChain[pokemonFound],
							id: pokemonSpecie.id,
							sprites: pokemonInfo
						};
					})
				);
			}
		}

		return evoChain;
	},
	getAbilities: async function( context, abilities ){
		const fullAbilities = [];

		await Promise.allSettled(
			abilities.map( async item => {
				const ability = { is_hidden: item.is_hidden, name: item.ability.name, url: item.ability.url, slot: item.slot };
				const abilityInfo = await this.$axios( ability.url ).then( response => response.data );
				fullAbilities.push({
					...ability,
					names: abilityInfo.names,
					effect_entries: abilityInfo.flavor_text_entries,
					effect_changes: abilityInfo.effect_changes
				});
			})
		);

		fullAbilities.sort(( a, b ) => ( a.slot > b.slot ) ? 1 : (( b.slot > a.slot ) ? -1 : 0 ));
		return fullAbilities;
	},
	getVarietiesInfo: async function( context, varieties ){
		const fullVarieties = [];

		await Promise.allSettled(
			varieties.map( async variety => {
				const varietyInfo = await this.$axios( variety.url ).then( response => response.data );
				if( varietyInfo ) fullVarieties.push( varietyInfo );
			})
		);

		fullVarieties.sort(( a, b ) => ( a.id > b.id ) ? 1 : (( b.id > a.id ) ? -1 : 0 ));
		return fullVarieties.map( variety => ({ id: variety.id, name: variety.name, sprites: variety.sprites }));
	}
};
