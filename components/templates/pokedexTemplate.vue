<template>
	<main v-if="region">
		<section class="section bg--secondary">
			<div class="container">
				<h1 class="heading--1 mb-4">
					The {{ region.name }} Region
				</h1>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque doloribus suscipit, eligendi aliquam labore et explicabo. Error delectus mollitia id recusandae iste voluptates tempora incidunt aliquam laborum voluptatem, cupiditate dolore?</p>
			</div>
		</section>

		<section v-if="region.starters.length" class="section">
			<div class="container">
				<div class="mb-32">
					<h1 class="heading--3 mb-4">
						{{ $t('Meet the Starters') }}
					</h1>
					<p>
						{{ $t(`${region.slug}_starters_description`) }}
					</p>
				</div>

				<div v-if="startersPokemons.length" class="row total mini">
					<div v-for="(starter, index) in startersPokemons" :key="index" class="col-6 col-sm-2">
						<pokemon-card :details="starter" />
					</div>
				</div>
				<div v-else class="row total mini">
					<div v-for="n in region.starters.length" :key="n" class="col-6 col-sm-2">
						<skeleton />
					</div>
				</div>
			</div>
		</section>

		<!-- <section v-if="region.legendaries.length" class="section bg--secondary">
			<div class="container">
				<div class="mb-32">
					<h1 class="heading--3 mb-4">
						{{ $t('Meet the Legendaries') }}
					</h1>
					<p>
						{{ $t(`${region.slug}_legendaries_description`) }}
					</p>
				</div>

				<div v-if="legendariesPokemons.length" class="row total mini">
					<div v-for="(legendary, index) in legendariesPokemons" :key="index" class="col-6 col-sm-2">
						<pokemon-card :details="legendary" />
					</div>
				</div>
				<div v-else class="row total mini">
					<div v-for="n in region.legendaries.length" :key="n" class="col-6 col-sm-2">
						<skeleton />
					</div>
				</div>
			</div>
		</section> -->

		<section class="section">
			<div class="container">
				<div class="mb-32">
					<h1 class="heading--3 mb-4">
						{{ $t('Explore') }} the {{ region.name }} dex
					</h1>
					<p>
						{{ $t(`${region.slug}_region_description`) }}
					</p>
				</div>

				<div v-if="pokemons.length">
					<div class="row total mini">
						<div v-for="featured in pokemons" :key="featured.id" class="col-6 col-sm-2">
							<pokemon-card :details="featured" />
						</div>
					</div>
					<div v-if="pokemons.length < fullDex.length" class="btn--holder d-flex justify-content-center mt-32">
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
		region: { type: Object, required: true }
	},
	data: function(){
		return {
			fullDex: [],
			pokemons: [],
			featuredLimit: 24,
			currentPage: 1,
			ready: false,
			loadingMore: false
		};
	},
	head: function(){
		return {
			title: `${this.region.name} Regional Pokédex`
		};
	},
	computed: {
		...mapState(['regions', 'darkMode', 'pokemonModal', 'selectedPokemon']),

		startersPokemons: function(){
			if( !this.region.starters ) return false;
			const starters = this.region.starters;
			return this.pokemons.filter( pokemon => starters.includes( pokemon.id ));
		},
		legendariesPokemons: function(){
			if( !this.region.legendaries ) return false;
			const legendaries = this.region.legendaries;
			return this.pokemons.filter( pokemon => legendaries.includes( pokemon.id ));
		}
	},
	created: async function(){
		this.fullDex = await this.getRegionalPokemons( this.region );
		this.pokemons = await this.getPokemonsInfo( this.fullDex.slice( 0, this.featuredLimit ));
	},
	methods: {
		...mapActions(['getRegionalPokemons', 'getPokemonsInfo']),

		getPaginationNext: async function(){
			if( this.pokemons.length < this.fullDex.length ){
				this.currentPage = this.currentPage + 1;
				this.loadingMore = true;

				const nextStart = this.pokemons.length;
				const nextLimit = this.featuredLimit * this.currentPage;
				const arrayNext = this.fullDex.slice( nextStart, nextLimit );

				await this.getPokemonsInfo( arrayNext ).then( response => {
					this.pokemons = [...this.pokemons, ...response];
					this.loadingMore = false;
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
