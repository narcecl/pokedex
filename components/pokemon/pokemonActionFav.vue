<template>
	<div :class="{ 'favorite_pokemon--selected': isFavorite(specie.name) }" class="favorite_pokemon cursor--pointer hover--opacity" title="Add to favorites" @click.prevent="addToFavorites()">
		<font-awesome-icon icon="heart" aria-hidden="true" />
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
	name: 'PokemonActions',
	props: {
		specie: { type: Object, default: () => ({}) }
	},
	computed: {
		...mapGetters(['isFavorite'])
	},
	methods: {
		...mapMutations(['ADD_TO_FAVORITES']),

		addToFavorites: function(){
			const { id, name } = this.specie; // eslint-disable-line camelcase
			this.ADD_TO_FAVORITES({
				entry_number: id,
				pokemon_species: {
					name: name
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.favorite_pokemon{
	position: relative;
	z-index: 10;

	&--selected{
		color: #e07b7b !important;
	}
}
</style>
