<template>
	<main v-if="pokemon" class="single">
		<section :class="getBackground" class="single--cover">
			<div class="container">
				<div class="d-flex justify-content-center justify-content-sm-start">
					<pokemon-image width="350" :name="pokemon.name" :types="pokemon.types" :src="pokemon.sprites" />
				</div>
			</div>
		</section>

		<section>
			<div class="container">
				<div class="single--info">
					<div class="pokemon-modal__block">
						<div class="d-flex align-items-center mb-8">
							<h1 class="heading--1 mr-16">
								{{ pokemon.name }}
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
									Specie
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
					Sprites
				</h2>
				<pokemon-sprites :sprites="sprites" :name="pokemon.name" />
			</div>
		</section>

		<section class="section section--sm">
			<div class="container">
				<h2 class="heading--5 mb-32">
					Abilities
				</h2>
				<pokemon-abilities :abilities="pokemon.abilities" />
			</div>
		</section>

		<section v-if="pokemonTypes.length" class="section section--sm">
			<div class="container">
				<h2 class="heading--5 mb-32">
					Damage Relations
				</h2>
				<pokemon-damage-relation :type="pokemon.types[0].type.name" />
			</div>
		</section>

		<section v-if="evolutionChain" class="section section--sm">
			<div class="container">
				<h2 class="heading--5 mb-32">
					Evolution Chain
				</h2>
				<pokemon-evolution-chain :evolution-chain="evolutionChain" />
			</div>
		</section>
	</main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	name: 'PokemonInfo',
	asyncData: async function({ params }){ // eslint-disable-line require-await
		const slug = params.slug;
		const id = slug.split( '-' )[0];
		const name = slug.split( '-' )[1];
		return { id, name }; // eslint-disable-line object-shorthand
	},
	data: function(){
		return {
			id: null,
			name: null,
			pokemon: null,
			specie: null,
			evolutionChain: null
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
			console.info( 'localRegions =>', localRegions );
			return this.specie.pokedex_numbers.filter( dex => localRegions.includes( dex.pokedex.name ));
		}
	},
	created: async function(){
		console.info( 'created =>', this.id, this.name );
		this.pokemon = await this.getPokemonInfo( this.id );
		console.info( 'pokemon =>', this.pokemon );
		if( this.pokemon ) this.specie = await this.getSpecie( this.pokemon.id ).then( response => response );
		console.info( 'specie =>', this.specie );
		if( this.specie ) this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url ).then( response => response );
		console.info( 'evolutionChain =>', this.evolutionChain );
		this.ready = true;
	},
	methods: {
		...mapActions(['getPokemonInfo', 'getSpecie', 'getEvolutionChain'])
	}
};
</script>

<style lang="scss" scoped>
.single{
	&--cover{
		padding: 24px 0 64px;

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
