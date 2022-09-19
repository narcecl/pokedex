<template>
	<main v-if="pokemon" class="single">
		<section :class="getBackground" class="single--cover">
			<div class="container">
				<div class="d-flex justify-content-center justify-content-sm-start">
					<pokemon-image width="350" height="350" :name="pokemon.name" :types="pokemon.types" :src="pokemon.sprites" />
				</div>
			</div>
		</section>

		<section>
			<div class="container">
				<div class="single--info">
					<div class="pokemon-modal__block">
						<div class="d-flex align-items-center mb-8">
							<h1 class="heading--1 mr-16">
								{{ specie.name }}
							</h1>
							<pokemon-types :types="pokemon.types" size="md" />
						</div>
						<p v-if="description">
							{{ description }}
						</p>
						<p v-else>
							{{ $t('no_description_pokemon') }}
						</p>
					</div>

					<div class="mt-48">
						<div class="row total mini align-items-center">
							<div v-if="generation" class="col-6 col-sm-3">
								<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
									{{ $t('generation') }}
								</h6>
								<p>
									{{ generation.name }} ({{ generation.code }})
								</p>
							</div>
							<div class="col-6 col-sm-3">
								<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
									{{ $t('weight') }}
								</h6>
								<p>
									{{ Math.round((pokemon.weight * 0.1) * 100) / 100 }} kg
								</p>
							</div>
							<div class="col-6 col-sm-3">
								<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
									{{ $t('height') }}
								</h6>
								<p>
									{{ Math.round((pokemon.height * 0.1) * 100) / 100 }} m
								</p>
							</div>
							<div v-if="specieName" class="col-6 col-sm-3">
								<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
									{{ $t('specie') }}
								</h6>
								<p>
									{{ specieName }}
								</p>
							</div>
							<div class="col-6 col-sm-3">
								<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
									National Dex
								</h6>
								<p>
									N.º {{ $methods.pad(pokemon.id) }}
								</p>
							</div>
							<div v-for="(dex, i) in pokedexNumbers" :key="i" class="col-6 col-sm-3">
								<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
									{{ dex.pokedex.name.split('-').join(' ') }} dex
								</h6>
								<p>
									N.º {{ $methods.pad(dex.entry_number) }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section v-if="Object.keys(sprites).length" class="section section--sm">
			<div class="container">
				<h2 class="heading--5 mb-32">
					{{ $t('Sprites') }}
				</h2>
				<pokemon-sprites :sprites="sprites" :name="pokemon.name" />
			</div>
		</section>

		<section class="section section--sm">
			<div class="container">
				<h2 class="heading--5 mb-32">
					{{ $t('Abilities') }}
				</h2>
				<pokemon-abilities :abilities="pokemon.abilities" />
			</div>
		</section>

		<section v-if="pokemonTypes.length" class="section section--sm">
			<div class="container">
				<h2 class="heading--5 mb-32">
					{{ $t('Damage relations') }}
				</h2>
				<pokemon-damage-relation :type="pokemon.types[0].type.name" />
			</div>
		</section>

		<!-- <section v-if="evolutionChain" class="section section--sm">
			<div class="container">
				<h2 class="heading--5 mb-32">
					Evolution Chain
				</h2>
				<pokemon-evolution-chain :evolution-chain="evolutionChain" />
			</div>
		</section> -->
	</main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	name: 'PokemonInfo',
	asyncData: async function({ store, params, error }){
		const name = params.slug;
		const specie = await store.dispatch( 'getPokemonSpecie', name );

		if( !specie ) return error({ statusCode: 404, message: 'Pokémon not found' });
		return { name, specie }; // eslint-disable-line object-shorthand
	},
	data: function(){
		return {
			name: null,
			specie: null,
			pokemon: null,
			evolutionChain: null
		};
	},
	head: function(){
		return {
			title: `${this.specie.id} - ${this.$methods.capitalize( this.specie.name )} | Pokédex Entry`
		};
	},
	computed: {
		...mapGetters(['getGenerationInfo']),
		...mapState(['pokemonTypes', 'regions']),

		sprites: function(){
			const sprites = {};

			Object.entries( this.pokemon.sprites ).forEach(([key, value]) => {
				if( typeof value === 'string' ) sprites[key] = value;
			});

			return sprites;
		},
		specieName: function(){
			if( !this.specie ) return false;
			const specie = this.specie.genera.find( item => item.language.name === this.$i18n.locale );
			return specie.genus;
		},
		description: function(){
			if( !this.specie ) return false;
			const description = this.specie.flavor_text_entries.find( item => item.language.name === this.$i18n.locale );
			return description.flavor_text;
		},
		generation: function(){
			if( !this.specie ) return false;
			return this.getGenerationInfo( this.specie.generation.name );
		},
		getBackground: function(){
			const firstType = this.pokemon.types[0].type.name;
			return `bg-light--${firstType}`;
		},
		pokedexNumbers: function(){
			if( !this.specie ) return false;
			const localRegions = this.regions.map( region => region.dexName );
			return this.specie.pokedex_numbers.filter( dex => localRegions.includes( dex.pokedex.name ));
		}
	},
	created: async function(){
		this.pokemon = await this.getPokemonInfo( this.specie.id );
		this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url );
	},
	methods: {
		...mapActions(['getPokemonInfo', 'getPokemonSpecie', 'getEvolutionChain'])
	}
};
</script>

<style lang="scss" scoped>
.single{
	&--cover{
		padding: 24px 0 64px;
		@include transition;

		picture{
			z-index: 9;
			position: relative;
		}
	}

	&--info{
		padding: 78px 32px 48px;
		background: white;
		margin-top: -132px;
		border-radius: 8px;
		@include transition;

		@media screen and (min-width: $break-sm){
			margin: -132px -32px 0;
		}
	}
}

.dark{
	.single{
		&--info{
			background: $dark-mode-secondary;
		}
	}
}
</style>
