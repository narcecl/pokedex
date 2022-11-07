<template>
	<transition name="fade">
		<div v-if="value" class="pokemon-filter" @click="closeOutside">
			<div ref="panel_content" class="pokemon-filter__cont" :class="{'pokemon-filter__cont--active': panelActive}">
				<div class="d-flex justify-content-end mb-16">
					<a class="d-block color--white hover--opacity" href="#" aria-label="close filter" @click.prevent="closeFilter">
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
							<nuxt-link :to="{name: 'pokemon-id-slug', params: { id: pokemon.id, slug: pokemon.name }}" class="d-flex align-items-center" @click.native="closeFilter">
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
	mounted: function(){
		this.addEscEvent();
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
		},
		closeOutside: function( event ){
			let parentModal = null;
			const parents = this.$methods.getParents( event.target, '.pokemon-filter' );

			parents.forEach( item => {
				if( item === this.$refs.panel_content ) parentModal = true;
			});

			if( !event.target.classList.contains( 'pokemon-filter__cont' ) && parentModal === null ){
				this.closeFilter();
			}
		},
		closeFilterByEsc: function( e ){
			if( e.keyCode === 27 ) this.closeFilter();
		},
		addEscEvent: function(){
			// Agregamos el evento keyup para cerrar la modal
			window.addEventListener( 'keyup', this.closeFilterByEsc );
		},
		rmEscEvent: function(){
			// Eliminamos el evento keyup para cerrar la modal
			window.removeEventListener( 'keyup', this.closeFilterByEsc );
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
		background: #fff;
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

		@media screen and (min-width: $break-lg){
			max-width: 50%;
			padding: 48px 32px;
		}

		@media screen and (min-width: $break-xl){
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
					border: 1px solid rgba(#000, .2);
					@include transition;

					&:hover{
						border-color: rgba(#000, .4);
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

.dark{
	.pokemon-filter{
		&__cont{
			background: $dark-mode-primary;

			&__results{
				ul{
					li{
						border-color: rgba(255,255,255, .2);

						&:hover{
							border-color: #fff;
						}
					}
				}
			}
		}
	}
}
</style>
