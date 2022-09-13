<template>
	<figure :class="getBackground" class="pokemon-image hidden--caption">
		<nuxt-img :src="getSource" :alt="`Official Artwork for ${name}`" :lazy="true" />
		<figcaption>{{ `Official Artwork for ${name}` }}</figcaption>
	</figure>
</template>

<script>
export default {
	name: 'PokemonImage',
	props: {
		name: { type: String, required: true },
		types: { type: Array, default: () => ([]) },
		src: { type: Object, deafult: () => ({}), required: true },
		plain: { type: Boolean, default: true },
		deep: { type: Boolean, default: true }
	},
	computed: {
		getBackground: function(){
			if( this.plain ) return;

			const firstType = this.types[0].type.name;
			return `bg-light--${firstType}`;
		},
		getSource: function(){
			if( this.deep ) return this.src.other['official-artwork'].front_default;
			return this.src;
		}
	}
};
</script>

<style lang="scss" scoped>
	.pokemon-image{
		&:deep img{
			display: block;
		}
	}
</style>
