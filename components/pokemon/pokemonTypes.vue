<template>
	<div>
		<div v-if="types.length" class="pokemon-types d-flex flex-wrap">
			<pokemon-type v-for="(type, index) in cleanTypes" :key="index" :type="type" :size="size" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'PokemonTypes',
	props: {
		types: { type: Array, required: true, default: () => ([]) },
		size: { type: String, default: 'xs' }
	},
	computed: {
		cleanTypes: function(){
			return this.types.map( item => item.type.name );
		}
	}
};
</script>

<style lang="scss" scoped>
.pokemon-types{
	margin: -3px;

	&:deep(div){
		padding: 3px;
	}
}
</style>
