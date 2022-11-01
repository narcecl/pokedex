<template>
	<main>
		<section class="section bg--secondary">
			<div class="container">
				<h1 class="heading--1 mb-4">
					{{ $t('favorites_title') }}
				</h1>
				<p v-if="favorites.length">
					{{ $t('favorites_description', {count: favorites.length}) }}
				</p>
				<p v-else>
					{{ $t('favorites_description_empty') }}
				</p>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<div v-if="pokemons.length">
					<div class="row total mini">
						<div v-for="pokemon in pokemons" :key="pokemon.id" class="col-6 col-sm-2">
							<pokemon-card :details="pokemon" :action-permalink="false" :modal="false" />
						</div>
					</div>
					<div v-if="pokemons.length < favorites.length" class="btn--holder d-flex justify-content-center mt-32">
						<action-button :name="$t('load more')" :loading="loadingMore" @click="getPaginationNext" />
					</div>
				</div>
				<div v-else class="row total mini">
					<div v-for="n in favorites.length" :key="n" class="col-6 col-sm-2">
						<skeleton />
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import mobile from '~/mixins/mobile';

export default {
	name: 'FavoritesPage',
	mixins: [mobile],
	data: function(){
		return {
			pokemons: [],
			favorites: [],
			featuredLimit: 24,
			currentPage: 1,
			ready: false,
			loadingMore: false
		};
	},
	computed: {
		...mapState(['favoritesPokemons'])
	},
	created: async function(){
		if( process.client ) this.favorites = JSON.parse( localStorage.getItem( 'favorites' ));
		if( this.favorites.length ){
			this.pokemons = await this.getPokemonsData({
				array: this.favorites.slice( 0, this.featuredLimit )
			});
		}
	},
	methods: {
		...mapActions(['getPokemonsData'])
	}
};
</script>

<style lang="scss" scoped>

</style>
