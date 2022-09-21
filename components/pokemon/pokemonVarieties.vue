<template>
	<div class="row total mini">
		<div v-for="(variety, i) in fullVarieties" :key="i" :class="fullVarieties.length > 8 ? 'col-sm-2' : 'col-sm-3'" class="col-6">
			<div class="box--light text-center">
				<div class="d-flex align-items-center">
					<pokemon-image :src="variety.sprites" :name="variety.name" :plain="true" width="256" />
				</div>
				<p class="f--xs text-uppercase mt-12">
					{{ variety.is_default ? 'Default' : '' }} {{ $methods.normalizeString( variety.name ) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'PokemonVarieties',
	props: {
		varieties: { type: Array, default: () => ([]) }
	},
	data: function(){
		return {
			fullVarieties: []
		};
	},
	computed: {
		foundVarieties: function(){
			if( !this.varieties.length ) return false;
			// const varieties = this.varieties.filter( item => !item.is_default );
			return this.varieties.map( item => item.pokemon );
		}
	},
	created: async function(){
		const foundVarieties = await this.getVarietiesInfo( this.foundVarieties );
		this.fullVarieties = foundVarieties.filter( variety => variety.sprites.other['official-artwork'].front_default );
	},
	methods: {
		...mapActions(['getVarietiesInfo'])
	}
};
</script>

<style lang="scss" scoped>

</style>
