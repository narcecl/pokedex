<template>
	<div class="row total mini">
		<div v-for="(sprite, key, i) in sprites" :key="i" class="col-6 col-sm-3">
			<div class="box--light text-center">
				<picture>
					<nuxt-img :src="sprite" :alt="`Sprite ${name}`" width="96" height="96" />
				</picture>
				<p class="f--xs text-uppercase mt-4">
					{{ $t(key) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PokemonSprites',
	props: {
		sprites: { type: Object, required: true },
		name: { type: String, default: '' }
	},
	created: function(){
		console.log( 'sprites =>', this.sprites );
	}
};
</script>
