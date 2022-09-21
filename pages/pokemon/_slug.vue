<template>
	<main v-if="pokemon" class="single">
		<section :class="getBackground" class="single--cover">
			<div class="container">
				<div class="d-flex justify-content-center justify-content-sm-start">
					<pokemon-image width="350" height="350" :name="specie.name" :types="pokemon.types" :src="pokemon.sprites" />
				</div>
			</div>
		</section>

		<section>
			<div class="container">
				<div class="single--info">
					<div class="section__block">
						<div class="d-sm-flex align-items-center mb-8">
							<pokemon-types :types="pokemon.types" size="md" class="order-sm-2 mb-16 mb-sm-0" />
							<h1 class="heading--1 mr-16 order-sm-1">
								{{ specie.name }}
							</h1>
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

		<section class="section">
			<div class="container">
				<tabs v-model="selectedTab">
					<tab-content id="info" :label="$t('Info')">
						<div class="row total">
							<div class="col-12 col-sm-6">
								<div class="section__block">
									<h2 class="heading--4">
										{{ $t('Stadistics') }}
									</h2>
									<p>{{ $t('pokemon_stadistics_desc', { name: prettyName }) }}</p>
								</div>
								<div class="section__block">
									<div class="w-100 w-sm-80">
										<pokemon-stats :stats="pokemon.stats" />
									</div>
								</div>
							</div>
							<div class="col-12 col-sm-6">
								<div class="section__block">
									<h2 class="heading--4">
										{{ $t('Abilities') }}
									</h2>
									<p>{{ $t('pokemon_abilies_desc', { name: prettyName }) }}</p>
								</div>
								<div class="section__block">
									<pokemon-abilities :abilities="pokemon.abilities" />
								</div>
							</div>
						</div>
					</tab-content>

					<tab-content v-if="Object.keys(sprites).length" id="sprites" :label="$t('Sprites')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Sprites') }}
							</h2>
							<p>{{ $t('pokemon_sprites_desc', { name: prettyName }) }}</p>
						</div>
						<div class="section__block">
							<pokemon-sprites :sprites="sprites" :name="specie.name" />
						</div>
					</tab-content>

					<tab-content v-if="specie.varieties.length > 1" id="varieties" :label="$t('Varieties')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Varieties') }}
							</h2>
							<p>{{ $t('pokemon_varieties_desc', { name: prettyName }) }}</p>
						</div>
						<div class="section__block">
							<pokemon-varieties :varieties="specie.varieties" />
						</div>
					</tab-content>

					<tab-content id="damage-relations" :label="$t('Damage relations')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Damage relations') }}
							</h2>
							<p v-html="$t('pokemon_damage_relations_desc', { type: firstType })"></p>
						</div>
						<div class="section__block">
							<pokemon-damage-relation :type="pokemon.types[0].type.name" />
						</div>
					</tab-content>

					<tab-content id="evolution-chain" :label="$t('Evolution chain')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Evolution chain') }}
							</h2>
							<p>{{ $t('pokemon_evolution_chain_desc', { name: prettyName }) }}</p>
						</div>
						<div class="section__block">
							<pokemon-evolution-chain v-if="evolutionChain" :evolution-chain="evolutionChain" />
						</div>
					</tab-content>
				</tabs>
			</div>
		</section>
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
			evolutionChain: null,
			selectedTab: 'info'
		};
	},
	head: function(){
		return {
			title: `${this.$methods.pad( this.specie.id )} - ${this.$methods.capitalize( this.specie.name )} | Pokédex Entry`
		};
	},
	computed: {
		...mapGetters(['getGenerationInfo', 'getLocaleTypeName']),
		...mapState(['pokemonTypes', 'regions']),

		prettyName: function(){
			return this.$methods.capitalize( this.specie.name );
		},
		firstType: function(){
			return this.getLocaleTypeName({ lang: this.$i18n.locale, type: this.pokemon.types[0].type.name });
		},
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
