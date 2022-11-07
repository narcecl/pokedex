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
				<div v-else-if="error.statusCode === 500">
					<div class="row total align-items-center">
						<div class="col-12 col-sm-6 order-2 order-sm-1 text-center text-sm-left">
							<h1 class="heading--3 mb-4">
								Oh no!
							</h1>
							<p class="f--md">
								{{ $t('404_error_page') }}
							</p>

							<p class="f--muted f--xs mt-24">
								Error reference:
								<mark class="d-block">
									{{ error.message }}
								</mark>
							</p>
						</div>
						<div class="col-12 col-sm-6 order-1 order-sm-2">
							<picture>
								<nuxt-img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png" />
							</picture>
						</div>
					</div>
				</div>
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
