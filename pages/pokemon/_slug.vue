<template>
	<main class="single">
		<section :class="getBackground" class="single__cover">
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
							<skeleton-item v-else type="title" class="w-30" />
						</div>
						<p v-if="ready">
							{{ description || $t('no_description_pokemon') }}
						</p>
						<skeleton-item v-else class="w-70" />
					</div>

					<div class="section__block">
						<pokemon-info
							:key="pokemon?.id"
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

					<tab-content id="sprites" :label="$t('Sprites')">
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

					<tab-content v-if="ready && specie.varieties.length > 1" id="varieties" :label="$t('Varieties')">
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

					<tab-content id="evolution-chain" :label="$t('Evolution chain')">
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
		const name = params.slug;
		// const specie = await store.dispatch( 'getPokemonSpecie', name );

		// if( !specie ) return error({ statusCode: 404, message: 'Pokémon not found' });
		return { name }; // eslint-disable-line object-shorthand
	},
	data: function(){
		return {
			name: null,
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
			// title: `${this.$methods.pad( this.specie.id )} - ${this.$methods.capitalize( this.specie.name )} | Pokédex Entry`
		};
	},
	computed: {
		...mapGetters(['getGenerationInfo', 'getLocaleTypeName']),
		...mapState(['pokemonTypes', 'regions']),

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
		}
	},
	created: async function(){
		this.specie = await this.getPokemonSpecie( this.name );

		if( this.specie ){
			this.pokemon = await this.getPokemonInfo( this.specie.id );

			if( !this.specie.evolution_chain ){
				this.evolutionChain = [];
			}
			else{
				this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url );
				this.habitat = await this.getHabitat( this.specie?.habitat?.url );
			}
		}

		if( this.specie && this.pokemon ) this.ready = true;
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
		@include transition;

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
