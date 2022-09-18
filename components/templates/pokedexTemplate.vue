<template>
	<main v-if="foundRegion">
		<section class="section bg--secondary">
			<div class="container">
				<h1 class="heading--1 mb-4">
					The {{ foundRegion.name }} Region
				</h1>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque doloribus suscipit, eligendi aliquam labore et explicabo. Error delectus mollitia id recusandae iste voluptates tempora incidunt aliquam laborum voluptatem, cupiditate dolore?</p>
			</div>
		</section>

		<section v-if="foundRegion.starters.length" class="section">
			<div class="container">
				<div class="mb-32">
					<h1 class="heading--3 mb-4">
						{{ $t('Meet the Starters') }}
					</h1>
					<p>
						{{ $t(`${foundRegion.slug}_starters_description`) }}
					</p>
				</div>

				<div v-if="startersPokemons.length" class="row total mini">
					<div v-for="(starter, index) in startersPokemons" :key="index" class="col-6 col-sm-2">
						<pokemon-card :details="starter" />
					</div>
				</div>
				<div v-else class="row total mini">
					<div v-for="n in foundRegion.starters.length" :key="n" class="col-6 col-sm-2">
						<skeleton />
					</div>
				</div>
			</div>
		</section>

		<section v-if="foundRegion.legendaries.length" class="section bg--secondary">
			<div class="container">
				<div class="mb-32">
					<h1 class="heading--3 mb-4">
						{{ $t('Meet the Legendaries') }}
					</h1>
					<p>
						{{ $t(`${foundRegion.slug}_legendaries_description`) }}
					</p>
				</div>

				<div v-if="legendariesPokemons.length" class="row total mini">
					<div v-for="(legendary, index) in legendariesPokemons" :key="index" class="col-6 col-sm-2">
						<pokemon-card :details="legendary" />
					</div>
				</div>
				<div v-else class="row total mini">
					<div v-for="n in foundRegion.legendaries.length" :key="n" class="col-6 col-sm-2">
						<skeleton />
					</div>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<div class="mb-32">
					<h1 class="heading--3 mb-4">
						{{ $t('Explore') }} the {{ foundRegion.name }} dex
					</h1>
					<p>
						{{ $t(`${foundRegion.slug}_region_description`) }}
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
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'MainTemplate',
	layout: 'default',
	props: {
		slug: { type: String, required: true }
	},
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
			title: `${this.foundRegion.name} Regional Pokédex`
		};
	},
	computed: {
		...mapState(['regions', 'darkMode', 'pokemonModal', 'selectedPokemon']),

		startersPokemons: function(){
			if( !this.foundRegion || !this.foundRegion.starters ) return false;
			const starters = this.foundRegion.starters;
			return this.pokemons.filter( pokemon => starters.includes( pokemon.id ));
		},
		legendariesPokemons: function(){
			if( !this.foundRegion || !this.foundRegion.legendaries ) return false;
			const legendaries = this.foundRegion.legendaries;
			return this.pokemons.filter( pokemon => legendaries.includes( pokemon.id ));
		},
		featuredPokemons: function(){
			return this.pokemons.slice( 0, this.featuredLimit );
		},
		foundRegion: function(){
			return this.regions.find( item => item.slug === this.slug );
		}
	},
	created: function(){
		this.getRegionalPokemons( this.foundRegion ).then( response => {
			if( response ) this.pokemons = response;
		});
	},
	methods: {
		...mapActions(['getRegionalPokemons']),

		getPaginationNext: function(){
			if( this.featuredLimit < this.pokemons.length ){
				this.loadingMore = true;
				setTimeout(() => {
					this.featuredLimit = this.featuredLimit + this.featuredLimit;
					this.loadingMore = false;
				}, 300 );
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
