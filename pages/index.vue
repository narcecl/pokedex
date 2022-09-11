<template>
	<article>
		<app-header />

		<main>
			<section class="section bg--secondary">
				<div class="container">
					<div class="mb-32">
						<h1 class="heading--3 mb-4">
							Meet the Starters
						</h1>
						<p>
							At the beginning of their quest, Trainers are given a starter Pokémon or first partner Pokémon, in Pokémon Red, Green, Blue, FireRed, and LeafGreen, Professor Oak will bring Trainers to his lab to give them one of the following to begin their journey:
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
							Explore Kanto
						</h1>
						<p>
							This is a list of Pokémon in the order dictated by the Kanto regional Pokédex, meaning that the starter Pokémon from Kanto will appear first, followed by Pokémon native to the Kanto region.
						</p>
					</div>

					<div v-if="featuredPokemons.length" class="row total mini">
						<div v-for="featured in featuredPokemons" :key="featured.id" class="col-6 col-sm-2">
							<pokemon-card :details="featured" />
						</div>
						<!-- <a href="#" @click.prevent="getPaginationNext">load more</a> -->
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
			pokemons: []
		};
	},
	computed: {
		...mapState(['pokemonModal', 'selectedPokemon', 'featuredLimit', 'paginationNext']),

		startersPokemons: function(){
			const starters = [1, 4, 7];
			return this.pokemons.filter( pokemon => starters.includes( pokemon.id ));
		},
		featuredPokemons: function(){
			return this.pokemons.slice( 0, this.featuredLimit );
		}
	},
	created: function(){
		this.getAllPokemons().then( response => {
			if( response ) this.pokemons = response;
		});
	},
	methods: {
		...mapActions(['getAllPokemons']),

		getPaginationNext: function(){
			if( this.paginationNext ){
				this.getAllPokemons( this.paginationNext );
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
