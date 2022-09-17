<template>
	<header>
		<div class="container">
			<div class="row total mini align-items-center justify-content-between">
				<div class="col-12 col-sm text-center text-sm-left">
					<nuxt-img src="/pokemon-logo.png" alt="Logo Pokémon" width="130" />
				</div>
				<div class="col-12 col-sm d-flex align-items-center justify-content-center justify-content-sm-end">
					<div v-for="locale in availableLocales" :key="locale.code" class="locale-switch">
						<a href="#" @click.prevent="$i18n.setLocale(locale.code)">
							{{ locale.name }}
						</a>
					</div>

					<dark-mode />

					<!-- <a href="#" class="search-toggle">
						<font-awesome-icon icon="magnifying-glass" />
					</a> -->
				</div>
			</div>
		</div>

		<nav>
			<div class="container">
				<ul class="d-flex align-items-center justify-content-between">
					<li v-for="(region, index) in getRegionNames" :key="index" class="nav__item">
						<nuxt-link :to="region.slug">
							{{ region.name }}
						</nuxt-link>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'AppHeader',
	computed: {
		...mapGetters(['getRegionNames']),

		availableLocales: function(){
			return this.$i18n.locales.filter( i => i.code !== this.$i18n.locale );
		}
	}
};
</script>

<style lang="scss" scoped>
header{
	padding: 24px 0;

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

	nav{
		margin-top: 32px;

		ul{
			padding-top: 24px;
			border-top: 1px solid rgba($color-text,.2);
			.nav__item{
				a{
					color: $color-text;
					text-transform: uppercase;
					font-weight: 700;
					text-decoration: none;
					font-size: 14px;
					@include transition;

					&:hover{
						opacity: .6;
					}

					&.nuxt-link-active{
						color: #fbc905 !important;
					}
				}
			}
		}
	}

	.nav-toggle, .search-toggle{
		font-size: 20px;
		cursor: pointer;
		@include transition;
		margin-left: 32px;
		color: $color-text;

		&:hover{
			opacity: .7;
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

		nav{
			ul{
				border-top: 1px solid rgba(255,255,255,.2);
				.nav__item{
					a{
						color: #fff;
					}
				}
			}
		}

		.nav-toggle, .search-toggle{
			color: #fff;
		}
	}
}
</style>
