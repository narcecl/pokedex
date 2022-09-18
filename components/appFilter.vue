<template>
	<transition name="fade">
		<div v-if="value" class="pokemon-filter">
			<div class="pokemon-filter__cont" :class="{'pokemon-filter__cont--active': panelActive}">
				<div class="d-flex justify-content-end mb-16">
					<a class="d-block text--white hover--opacity" href="#" aria-label="close filter" @click.prevent="closeFilter">
						<font-awesome-icon class="f-24" icon="xmark" aria-hidden="true" />
					</a>
				</div>

				<h6 class="heading--4 mb-4 text-center">
					Search a Pokémon
				</h6>
				<p class="text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>

				<div class="my-32">
					<custom-input v-model="query" :placeholder="$t('query_placeholder')" />
				</div>

				<div v-if="filterResults.length" class="pokemon-filter__cont__results">
					<ul>
						<li v-for="(pokemon, i) in filterResults" :key="i">
							<nuxt-link :to="{name: 'pokemon-slug', params: { slug: `${pokemon.id}-${pokemon.name}` }}" class="d-flex align-items-center" @click.native="closeFilter">
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
import { mapGetters } from 'vuex';

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
		...mapGetters(['getPokemonByQuery']),

		filterResults: function(){
			const results = this.getPokemonByQuery( this.query );
			if( results.length > this.showLimit ){
				return results.slice( 0, this.showLimit );
			}
			console.info( 'results =>', results );
			return results;
		}
	},
	watch: {
		value: function( val ){
			if( val ) this.showPanel();
		}
	},
	mounted: function(){
		this.showPanel();
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
		width: 30%;
		background: $dark-mode-primary;
		transform: translate(100%, 0);
		height: 100%;
		padding: 48px 32px;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		right: 0;
		overflow-x: auto;
		@include transition;

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
					}
				}
			}
		}
	}
}
</style>
