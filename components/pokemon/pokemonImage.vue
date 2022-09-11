<template>
	<figure :class="getBackground">
		<nuxt-img :src="getSource" :alt="`Official Artwork for ${name}`" />
	</figure>
</template>

<script>
export default {
	name: 'PokemonImage',
	props: {
		name: { type: String, required: true },
		types: { type: Array, required: true },
		src: { type: Object, required: true },
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
