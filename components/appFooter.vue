<template>
	<footer>
		<div class="container">
			<div class="row total mini align-items-center justify-content-between">
				<div class="col-12 col-sm text-center text-sm-left">
					<p class="f--sm">
						{{ $t('copyright_personal') }} <mark>Nicolás Arce</mark>.
					</p>
				</div>
				<div class="col-12 col-sm text-center text-sm-right">
					<p class="f--sm">
						Made with
						<a href="https://vuejs.org/" class="link--regular" target="_blank">
							Vue.js
						</a>
						&
						<a href="https://nuxtjs.org/" class="link--regular" target="_blank">
							NuxtJS
						</a>
					</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'AppFooter'
};
</script>

<style lang="scss" scoped>
footer{
	padding: 16px 0;

	.link--regular{
		font-weight: 700;
		color: #00dc82;
	}
}
</style>
