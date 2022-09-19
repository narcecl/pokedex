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
					<div class="section__block">
						<div class="d-flex align-items-center mb-8">
							<h1 class="heading--1 mr-16">
								{{ specie.name }}
							</h1>
							<pokemon-types :types="pokemon.types" size="md" />
						</div>
						<p>
							{{ description || $t('no_description_pokemon') }}
						</p>
					</div>

					<div class="section__block">
						<pokemon-info :specie="specie" :weight="pokemon.weight" :height="pokemon.height" />
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
	name: 'PokemonSingle',
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
			title: `${this.$methods.capitalize( this.specie.name )} -  ${this.specie.id} | Pokédex Entry`
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
		description: function(){
			if( !this.specie ) return false;
			const description = this.specie.flavor_text_entries.find( item => item.language.name === this.$i18n.locale );
			return description.flavor_text;
		},
		getBackground: function(){
			const firstType = this.pokemon.types[0].type.name;
			return `bg-light--${firstType}`;
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
