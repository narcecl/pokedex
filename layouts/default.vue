<template>
	<article>
		<app-header />
		<nuxt />
		<app-footer />
	</article>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
	name: 'LayoutDefault',
	head: function(){
		return {
			htmlAttrs: {
				class: this.$store.state.darkMode ? 'dark' : null,
				lang: this.$i18n.locale
			}
		};
	},
	computed: {
		...mapState(['allPokemons', 'pokemonTypes', 'eggGroups', 'favoritesPokemons'])
	},
	watch: {
		$route: function(){
			this.SET_POKEMON_MODAL( false );
			this.SELECT_POKEMON( null );
		},
		favoritesPokemons: function( value ){
			localStorage.setItem( 'favorites', JSON.stringify( value ));
		}
	},
	beforeMount: function(){
		// Initial set of color scheme
		this.checkCookieDarkMode();
	},
	created: function(){
		// Initial call to all pokemons and types
		if( !this.allPokemons.length ) this.getAllPokemons();
		if( !this.pokemonTypes.length ) this.getPokemonTypes();
		if( !this.eggGroups.length ) this.getPokemonEggGroups();

		// Favorites from localStorage
		if( process.client ){
			const favorites = JSON.parse( localStorage.getItem( 'favorites' )) || [];
			if( favorites.length ) this.SET_FAVORITES( favorites );
		}
	},
	mounted: function(){
		// Listen for changes in the color scheme
		window.matchMedia( '(prefers-color-scheme: dark)' ).addEventListener( 'change', this.checkTheme );

		this.$nextTick(() => {
			// Show the content and remove loader after the first update
			this.ready = true;
			setTimeout(() => this.$nuxt.$loading.finish(), 500 );
		});
	},
	methods: {
		...mapActions(['getAllPokemons', 'getPokemonTypes', 'getPokemonEggGroups']),
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON', 'SET_FAVORITES']),

		checkCookieDarkMode: function(){
			const darkMode = this.$methods.getCookie( 'dark_mode' );
			if( darkMode !== this.darkMode ) this.$store.commit( 'SET_DARK', ( darkMode === 'true' ));
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
