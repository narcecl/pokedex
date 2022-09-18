<template>
	<div class="row total mini justify-content-center">
		<div v-for="(sprite, key, i) in sprites" :key="i" class="col-6 col-sm-3">
			<div class="text-center">
				<nuxt-img :src="sprite" :alt="`Sprite ${name}`" />
				<p class="f--xs text-uppercase">
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
	}
};
</script>
