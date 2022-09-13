<template>
	<header>
		<div class="container">
			<div class="row total mini align-items-center justify-content-between">
				<div class="col-12 col-sm text-center text-sm-left">
					<nuxt-img src="/pokemon-logo.png" alt="Logo Pokémon" width="130" />
				</div>
				<div class="col-12 col-sm d-flex align-items-center justify-content-end">
					<div v-for="locale in availableLocales" :key="locale.code" class="locale-switch">
						<a href="#" @click.prevent="$i18n.setLocale(locale.code)">
							{{ locale.name }}
						</a>
					</div>

					<dark-mode />
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'AppHeader',
	computed: {
		availableLocales: function(){
			return this.$i18n.locales.filter( i => i.code !== this.$i18n.locale );
		}
	}
};
</script>

<style lang="scss" scoped>
header{
	padding: 16px 0;

	.locale-switch{
		margin-right: 32px;

		a{
			color: $color-text;
			text-decoration: none;
			font-weight: 700;
			@include transition;

			&:hover{
				opacity: .6;
			}
		}
	}
}

.dark{
	header{
		.locale-switch{
			a {
				color: #fff;
			}
		}
	}
}
</style>
