<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__cont">
				<div class="row total mini align-items-center justify-content-between">
					<div class="col-12 col-sm text-center text-sm-left">
						<p class="f--sm">
							<font-awesome-icon class="animated animate__heartBeat animated__infinite mr-12" icon="heart" aria-hidden="true" />
							{{ $t('copyright_personal') }}
							<a href="https://www.narce.cl" target="_blank">
								<mark>Nicolás Arce</mark>
							</a>.
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
		</div>
	</footer>
</template>

<script>
export default {
	name: 'AppFooter'
};
</script>

<style lang="scss" scoped>
.footer{
	padding: 32px 0 48px;

	&__cont{
		padding-top: 32px;
		border-top: 1px solid rgba(#000, .1);

		.link--regular{
			font-weight: 700;
			color: #00dc82;
		}
	}
}

.dark{
	.footer{
		&__cont{
			border-top: 1px solid rgba(#fff, .1);
		}
	}
}
</style>
