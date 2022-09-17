<template>
	<div>
		<pokemon-type v-for="(type, index) in cleanTypes" :key="index" :type="type" :size="size" />
	</div>
</template>

<script>
export default {
	name: 'PokemonTypes',
	props: {
		types: { type: Array, required: true },
		size: { type: String, default: 'xs' }
	},
	computed: {
		cleanTypes: function(){
			return this.types.map( item => item.type.name );
		}
	}
};
</script>
