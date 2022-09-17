<template>
	<main>
		<section class="section">
			<div class="container">
				<h1 v-if="error.statusCode === 404" class="heading--3 mb-4">
					Page not found
				</h1>
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
