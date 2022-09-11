<template>
	<header>
		<div class="container">
			<div class="row total mini align-items-center justify-content-between">
				<div class="col-12 col-sm text-center text-sm-left">
					<p class="f--sm">
						Developed with love by <mark>Nicolás Arce</mark>.
					</p>
				</div>
				<div class="col-12 col-sm text-center text-sm-right">
					<p class="f--sm">
						Made with
						<a href="https://vuejs.org/" target="_blank">
							Vue.js
						</a>
						&
						<a href="https://nuxtjs.org/" target="_blank">
							NuxtJS
						</a>.
					</p>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'AppFooter'
};
</script>

<style lang="scss" scoped>
header{
	padding: 16px 0;
}
</style>
