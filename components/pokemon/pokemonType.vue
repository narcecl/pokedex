<template>
	<span :class="`bg--${type}`" class="pokemon--type">
		{{ type }}
	</span>
</template>

<script>
export default {
	name: 'PokemonType',
	props: {
		type: { type: String, required: true }
	}
};
</script>

<style lang="scss" scoped>
.pokemon{
	&--type{
		padding: 4px 6px;
		border-radius: 6px;
		text-transform: uppercase;
		font-size: 10px;
		color: #fff;
		display: inline-block;

		+ .pokemon--type{
			margin-left: 4px;
		}
	}
}
</style>
