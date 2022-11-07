<template>
	<main class="single">
		<section :class="getBackground" class="single__cover">
			<div class="circles">
				<div v-for="n in 10" :key="n" />
			</div>
			<div class="container">
				<div class="d-flex justify-content-center justify-content-sm-start">
					<div class="single__cover__image">
						<pokemon-image v-if="ready" width="350" height="350" :name="specie.name" :types="pokemon.types" :src="pokemon.sprites" />
						<skeleton-item v-else type="image" image-width="350" image-height="350" />
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="container">
				<div class="single__info">
					<pokemon-actions :ready="ready" :permalink="false" :specie="{ id: specie?.id, name: specie?.name }" />

					<div class="section__block mt-32">
						<div class="d-sm-flex align-items-center mb-8">
							<pokemon-types v-if="ready" :types="pokemon.types" size="md" class="order-sm-2 mb-16 mb-sm-0" />
							<h1 v-if="ready" class="heading--1 mr-16 order-sm-1">
								{{ specie.name }}
							</h1>
							<skeleton-item v-else type="title" size="lg" class="w-30" />
						</div>
						<p v-if="ready">
							{{ description || $t('no_description_pokemon') }}
						</p>
						<skeleton-item v-else size="lg" class="w-70" />
					</div>

					<div class="section__block">
						<pokemon-info
							:ready="ready"
							:specie="specie"
							:weight="pokemon?.weight"
							:height="pokemon?.height"
							:habitat="habitat"
						/>
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
										<pokemon-stats :key="pokemon?.id" :stats="pokemon?.stats" />
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
									<pokemon-abilities :key="pokemon?.id" :abilities="pokemon?.abilities" />
								</div>
							</div>
						</div>
					</tab-content>

					<tab-content v-if="Object.keys(sprites).length" id="sprites" :label="$t('Sprites')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Sprites') }}
							</h2>
							<p v-if="ready">
								{{ $t('pokemon_sprites_desc', { name: prettyName }) }}
							</p>
						</div>
						<div class="section__block">
							<pokemon-sprites v-if="ready" :sprites="sprites" :name="specie.name" />
						</div>
					</tab-content>

					<tab-content v-if="hasVarieties" id="varieties" :label="$t('Varieties')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Varieties') }}
							</h2>
							<p>{{ $t('pokemon_varieties_desc', { name: prettyName }) }}</p>
						</div>
						<div class="section__block">
							<pokemon-varieties v-if="ready" :varieties="specie.varieties" />
						</div>
					</tab-content>

					<tab-content id="damage-relations" :label="$t('Damage relations')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Damage relations') }}
							</h2>
							<p>{{ $t('pokemon_damage_relations_desc', { type: firstType }) }}</p>
						</div>
						<div class="section__block">
							<pokemon-damage-relation v-if="ready" :type="pokemon.types[0].type.name" />
						</div>
					</tab-content>

					<tab-content v-if="hasEvolutionChain" id="evolution-chain" :label="$t('Evolution chain')">
						<div class="section__block">
							<h2 class="heading--4">
								{{ $t('Evolution chain') }}
							</h2>
							<p v-if="ready">
								{{ $t('pokemon_evolution_chain_desc', { name: prettyName }) }}
							</p>
						</div>
						<div class="section__block">
							<pokemon-evolution-chain v-if="ready" :evolution-chain="evolutionChain" />
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
	asyncData: function({ store, params, error }){
		const { id, slug } = params;
		// const specie = await store.dispatch( 'getPokemonSpecie', name );

		// if( !specie ) return error({ statusCode: 404, message: 'Pokémon not found' });
		return { id, slug }; // eslint-disable-line object-shorthand
	},
	data: function(){
		return {
			id: null,
			slug: null,
			ready: false,
			specie: null,
			pokemon: null,
			habitat: null,
			evolutionChain: false,
			selectedTab: 'info'
		};
	},
	head: function(){
		return {
			title: `${this.getTitle} Regional Pokédex`
		};
	},
	computed: {
		...mapGetters(['getGenerationInfo', 'getLocaleTypeName']),
		...mapState(['pokemonTypes', 'regions']),

		getTitle: function(){
			if( !this.specie ) return '';
			return `${this.$methods.pad( this.id )} - ${this.$methods.capitalize( this.specie.name )} |`;
		},
		prettyName: function(){
			if( !this.specie ) return '';
			return this.$methods.capitalize( this.specie.name );
		},
		firstType: function(){
			if( !this.pokemon ) return '';
			return this.getLocaleTypeName({ lang: this.$i18n.locale, type: this.pokemon.types[0].type.name });
		},
		sprites: function(){
			if( !this.pokemon ) return false;

			const sprites = {};

			Object.entries( this.pokemon.sprites ).forEach(([key, value]) => {
				if( typeof value === 'string' ) sprites[key] = value;
			});

			return sprites;
		},
		description: function(){
			if( !this.specie ) return false;
			const description = this.specie.flavor_text_entries.find( item => item.language.name === this.$i18n.locale );
			return description ? description.flavor_text : false;
		},
		getBackground: function(){
			if( !this.pokemon || !this.pokemon.types.length ) return false;
			const firstType = this.pokemon.types[0].type.name;
			return `bg-light--${firstType}`;
		},
		hasEvolutionChain: function(){
			return this.evolutionChain.length > 1 || ( this.evolutionChain.length === 1 && this.evolutionChain[0].evolutionSplit.length );
		},
		hasVarieties: function(){
			if( !this.specie ) return false;
			return this.specie.varieties.length > 1;
		}
	},
	created: async function(){
		this.pokemon = await this.getPokemonInfo( this.id );
		this.specie = await this.getPokemonSpecie( this.pokemon.species.name );

		if( !this.specie.evolution_chain ){
			this.evolutionChain = [];
		}
		else{
			this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url );
			this.habitat = await this.getHabitat( this.specie?.habitat?.url );
		}

		// Retuning data
		if( this.specie && this.pokemon ) this.ready = true;
		else this.$nuxt.error({ statusCode: 404, message: 'Pokémon not found' });
	},
	methods: {
		...mapActions(['getPokemonInfo', 'getPokemonSpecie', 'getEvolutionChain', 'getHabitat'])
	}
};
</script>

<style lang="scss" scoped>
.single{
	&__cover{
		padding: 24px 0 64px;
		position: relative;
		@include transition;

		.circles{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;

			div{
				position: absolute;
				display: block;
				border-radius: 100%;
				background: rgba(#000, .05);
				animation: animate 25s linear infinite;
				bottom: -150px;

				&:nth-child(1){
					left: 25%;
					width: 80px;
					height: 80px;
					animation-delay: 0s;
				}
				&:nth-child(2){
					left: 10%;
					width: 20px;
					height: 20px;
					animation-delay: 2s;
					animation-duration: 12s;
				}
				&:nth-child(3){
					left: 70%;
					width: 20px;
					height: 20px;
					animation-delay: 4s;
				}
				&:nth-child(4){
					left: 40%;
					width: 60px;
					height: 60px;
					animation-delay: 0s;
					animation-duration: 18s;
				}
				&:nth-child(5){
					left: 65%;
					width: 20px;
					height: 20px;
					animation-delay: 0s;
				}
				&:nth-child(6){
					left: 75%;
					width: 110px;
					height: 110px;
					animation-delay: 3s;
				}
				&:nth-child(7){
					left: 35%;
					width: 150px;
					height: 150px;
					animation-delay: 7s;
				}
				&:nth-child(8){
					left: 50%;
					width: 25px;
					height: 25px;
					animation-delay: 15s;
					animation-duration: 45s;
				}
				&:nth-child(9){
					left: 20%;
					width: 15px;
					height: 15px;
					animation-delay: 2s;
					animation-duration: 35s;
				}
				&:nth-child(10){
					left: 85%;
					width: 150px;
					height: 150px;
					animation-delay: 0s;
					animation-duration: 11s;
				}
			}
		}

		@keyframes animate {
			0%{
				transform: translateY(0) rotate(0deg);
				opacity: 1;
			}

			100%{
				transform: translateY(-1000px) rotate(720deg);
				opacity: 0;
			}
		}

		&__image{
			z-index: 9;
			position: relative;
		}
	}

	&__info{
		padding: 32px 32px 48px;
		background: white;
		margin-top: -132px;
		border-radius: 8px;
		@include transition;

		@media screen and (min-width: $break-sm){
			margin: -132px -32px 0;
		}

		@media screen and (min-width: $break-lg){
			margin: -132px -16px 0;
		}
	}
}

.dark{
	.single{
		&__info{
			background: $dark-mode-secondary;
		}
	}
}
</style>
