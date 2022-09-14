<template>
	<article>
		<app-header />

		<main>
			<section class="section bg--secondary">
				<div class="container">
					<div class="mb-32">
						<h1 class="heading--3 mb-4">
							{{ $t('Meet the Starters') }}
						</h1>
						<p>
							{{ $t('starters_description') }}
						</p>
					</div>

					<div v-if="startersPokemons.length" class="row total mini">
						<div v-for="(featured, index) in startersPokemons" :key="index" class="col-6 col-sm-2">
							<pokemon-card :details="featured" />
						</div>
					</div>
					<div v-else class="row total mini">
						<div v-for="n in 3" :key="n" class="col-6 col-sm-2">
							<skeleton />
						</div>
					</div>
				</div>
			</section>

			<section class="section">
				<div class="container">
					<div class="mb-32">
						<h1 class="heading--3 mb-4">
							{{ $t('Explore Kanto') }}
						</h1>
						<p>
							{{ $t('pokedex_description') }}
						</p>
					</div>

					<div v-if="featuredPokemons.length">
						<div class="row total mini">
							<div v-for="featured in featuredPokemons" :key="featured.id" class="col-6 col-sm-2">
								<pokemon-card :details="featured" />
							</div>
						</div>
						<div v-if="featuredLimit < pokemons.length" class="btn--holder d-flex justify-content-center mt-32">
							<action-button :name="$t('load more')" :loading="loadingMore" @click="getPaginationNext" />
						</div>
					</div>
					<div v-else class="row total mini">
						<div v-for="n in featuredLimit" :key="n" class="col-6 col-sm-2">
							<skeleton />
						</div>
					</div>
				</div>
			</section>

			<pokemon-modal v-if="selectedPokemon" :pokemon="selectedPokemon" />
		</main>

		<app-footer />
	</article>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'IndexPage',
	data: function(){
		return {
			pokemons: [],
			featuredLimit: 24,
			ready: false,
			loadingMore: false
		};
	},
	head: function(){
		return {
			htmlAttrs: {
				class: this.$store.state.darkMode ? 'dark' : null,
				lang: this.$i18n.locale
			}
		};
	},
	computed: {
		...mapState(['pokemonModal', 'selectedPokemon', 'paginationNext']),

		startersPokemons: function(){
			const starters = [1, 4, 7];
			return this.pokemons.filter( pokemon => starters.includes( pokemon.id ));
		},
		featuredPokemons: function(){
			return this.pokemons.slice( 0, this.featuredLimit );
		}
	},
	created: function(){
		if( !this.pokemons.length ){
			this.getAllPokemons()
				.then( response => {
					if( response ) this.pokemons = response;
				});
		}
	},
	beforeMount: function(){
		// Initial set of color scheme
		this.checkTheme();
	},
	mounted: function(){
		// Listen for changes in the color scheme
		window.matchMedia( '(prefers-color-scheme: dark)' )
			.addEventListener( 'change', this.checkTheme );

		this.$nextTick(() => {
			// Show the content and remove loader after the first update
			this.ready = true;
			setTimeout(() => this.$nuxt.$loading.finish(), 500 );
		});
	},
	methods: {
		...mapActions(['getAllPokemons']),

		getPaginationNext: function(){
			if( this.featuredLimit < this.pokemons.length ){
				this.loadingMore = true;
				setTimeout(() => {
					this.featuredLimit = this.featuredLimit + this.featuredLimit;
					this.loadingMore = false;
				}, 300 );
			}
		},
		checkTheme: function(){
			// Check color scheme and change the store value
			if( window.matchMedia ){
				this.$store.commit( 'SET_DARK', ( window.matchMedia( '(prefers-color-scheme: dark)' ).matches ));
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
