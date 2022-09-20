<template>
	<transition name="fade">
		<div v-if="value" class="pokemon-filter">
			<div class="pokemon-filter__cont" :class="{'pokemon-filter__cont--active': panelActive}">
				<div class="d-flex justify-content-end mb-16">
					<a class="d-block text--white hover--opacity" href="#" aria-label="close filter" @click.prevent="closeFilter">
						<font-awesome-icon class="f-24" icon="xmark" aria-hidden="true" />
					</a>
				</div>

				<div class="text-center">
					<h6 class="heading--4 mb-4">
						Find a Pokémon
					</h6>
					<p>Search between {{ allPokemons.length }} Pokémons.</p>
				</div>

				<div class="my-32">
					<custom-input v-model="query" :placeholder="$t('query_placeholder')" />
				</div>

				<div v-if="filterResults.length" class="pokemon-filter__cont__results">
					<ul>
						<li v-for="(pokemon, i) in filterResults" :key="i">
							<nuxt-link :to="{name: 'pokemon-slug', params: { slug: pokemon.name }}" class="d-flex align-items-center" @click.native="closeFilter">
								<nuxt-img :src="`${imgSrc}/${pokemon.id}.png`" width="48" />
								<div class="ml-16">
									<p class="sub--title">
										{{ pokemon.name }}
									</p>
									<p class="f--sm">
										N.º {{ $methods.pad(pokemon.id) }}
									</p>
								</div>
							</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
	name: 'AppFilter',
	props: {
		value: { type: Boolean, default: false }
	},
	data: function(){
		return {
			imgSrc: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
			query: '',
			showLimit: 7,
			panelActive: false
		};
	},
	head: function(){
		return {
			bodyAttrs: {
				class: this.value && 'modal--open'
			}
		};
	},
	computed: {
		...mapState(['allPokemons']),
		...mapGetters(['getPokemonByQuery']),

		filterResults: function(){
			const query = this.query.toLowerCase();
			const results = this.getPokemonByQuery( query );
			if( results.length > this.showLimit ){
				return results.slice( 0, this.showLimit );
			}
			return results;
		}
	},
	watch: {
		value: function( val ){
			if( val ) this.showPanel();
		}
	},
	methods: {
		showPanel: function(){
			setTimeout(() => {
				this.panelActive = true;
			}, 300 );
		},
		closeFilter: function(){
			this.panelActive = false;
			setTimeout(() => {
				this.query = '';
				this.$emit( 'input', !this.value );
			}, 300 );
		}
	}
};
</script>

<style lang="scss" scoped>
.pokemon-filter{
	display: block;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background: rgba($primary-black, .8);
	z-index: 100;
	backdrop-filter: blur(10px);

	&__cont{
		width: 100%;
		max-width: 85%;
		background: $dark-mode-primary;
		transform: translate(100%, 0);
		height: 100%;
		padding: 32px 20px;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		right: 0;
		overflow-x: auto;
		@include transition;

		@media screen and (min-width: $break-sm){
			max-width: 30%;
			padding: 48px 32px;
		}

		&--active{
			transform: none;
		}

		&__results{
			ul{
				li{
					margin-bottom: 8px;
					padding: 10px 12px;
					border-radius: 8px;
					border: 1px solid rgba(255,255,255, .2);
					@include transition;

					&:hover{
						border-color: #fff;
					}

					&:last-of-type{
						margin-bottom: 0;
					}

					a{
						text-decoration: none;
						display: block;
					}
				}
			}
		}
	}
}
</style>
