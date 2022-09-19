<template>
	<main>
		<section class="section bg--secondary">
			<div class="container">
				<div v-if="error.statusCode === 404">
					<div class="row total align-items-center">
						<div class="col-12 col-sm-6 order-2 order-sm-1 text-center text-sm-left">
							<h1 class="heading--3 mb-4">
								Oops, {{ error.message }}
							</h1>
							<p class="f--md">
								We couldn't find the page you're looking for.
							</p>
						</div>
						<div class="col-12 col-sm-6 order-1 order-sm-2">
							<picture>
								<nuxt-img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/404.png" />
							</picture>
						</div>
					</div>
				</div>
				<h1 v-else>
					An error occurred
				</h1>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: 'ErrorPage',
	props: {
		error: { type: Object, required: true }
	}
};
</script>
