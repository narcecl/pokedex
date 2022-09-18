<template>
	<picture :class="getBackground" class="pokemon-image hidden--caption">
		<nuxt-img v-if="getSource" :src="getSource" :alt="`Official Artwork for ${name}`" :lazy="true" :width="width" :height="height" />
		<figcaption>{{ `Official Artwork for ${name}` }}</figcaption>
	</picture>
</template>

<script>
export default {
	name: 'PokemonImage',
	props: {
		name: { type: String, required: true },
		types: { type: Array, default: () => ([]) },
		src: { type: Object, default: () => ({}), required: true },
		plain: { type: Boolean, default: true },
		deep: { type: Boolean, default: true },
		width: { type: [Number, String], default: '100%' },
		height: { type: [Number, String], default: '100%' }
	},
	computed: {
		getBackground: function(){
			if( this.plain ) return;

			const firstType = this.types[0].type.name;
			return `bg-light--${firstType}`;
		},
		getSource: function(){
			if( !Object.keys( this.src ).length ) return '';
			if( this.deep && Object.keys( this.src ).length ) return this.src.other['official-artwork'].front_default;
			return this.src;
		}
	}
};
</script>

<style lang="scss" scoped>
	.pokemon-image{
		&:deep(img){
			display: block;
		}
	}
</style>
