<template>
	<div>
		<pokemon-type v-for="(type, index) in cleanTypes" :key="index" :type="type" />
	</div>
</template>

<script>
export default {
	name: 'PokemonTypes',
	props: {
		types: { type: Array, required: true }
	},
	computed: {
		cleanTypes: function(){
			return this.types.map( item => item.type.name );
		}
	}
};
</script>
