<template>
	<header>
		<div class="container">
			<div class="row total mini align-items-center justify-content-between">
				<div class="col-12 col-sm text-center text-sm-left">
					<nuxt-img src="images/pokemon-logo.png" alt="Logo Pokémon" width="130" />
				</div>
				<div class="col-12 col-sm text-center text-sm-right">
					<p>
						Kanto Regional Pokédex
					</p>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'AppHeader'
};
</script>

<style lang="scss" scoped>
header{
	padding: 16px 0;
}
</style>
