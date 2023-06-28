<template>
	<picture :class="getBackground" class="pokemon-image hidden--caption">
		<div :style="{ height: `${height}px` }">
			<nuxt-img
				v-if="getSource"
				:src="getSource"
				:alt="`${normalizeName} Official Artwork`"
				:lazy="true"
				:width="width"
				:height="height"
			/>
		</div>
		<figcaption>{{ `${normalizeName} Official Artwork` }}</figcaption>
	</picture>
</template>

<script>
export default {
	name: 'PokemonImage',
	props: {
		name: { type: String, default: '' },
		types: { type: Array, default: () => ([]) },
		src: { type: [Object, String], default: () => ({}) },
		plain: { type: Boolean, default: true },
		deep: { type: Boolean, default: true },
		width: { type: [Number, String], default: '100%' },
		height: { type: [Number, String], default: '100%' }
	},
	computed: {
		getBackground: function(){
			if( this.plain || !this.types.length ) return;

			const firstType = this.types[0].type.name;
			return `bg-light--${firstType}`;
		},
		normalizeName: function(){
			return this.$methods.normalizeString( this.name );
		},
		getSource: function(){
			if( !this.src || !Object.keys( this.src ).length ) return '';
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
