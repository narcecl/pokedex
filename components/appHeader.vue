<template>
	<header>
		<div class="container">
			<div class="row total align-items-center justify-content-between">
				<div class="col-12 col-sm text-center text-sm-left">
					<div class="d-flex align-items-center justify-content-center justify-content-sm-start">
						<nuxt-img :src="`${STATIC_PATH}/pokemon-logo.png`" alt="Logo Pokémon" width="130" />
						<p class="f--xs text--muted ml-32">
							Regional Pokédex
						</p>
					</div>
				</div>
				<div class="col-12 col-sm d-flex align-items-center justify-content-center justify-content-sm-end">
					<div v-for="locale in availableLocales" :key="locale.code" class="locale-switch">
						<a href="#" @click.prevent="$i18n.setLocale(locale.code)">
							<font-awesome-icon icon="earth-americas" class="mr-4" />
							{{ locale.name }}
						</a>
					</div>

					<dark-mode />

					<a href="#" class="search-toggle f-20 hover--opacity" @click.prevent="toggleFilter">
						<font-awesome-icon icon="magnifying-glass" />
					</a>

					<a href="#" class="d-inline d-sm-none search-toggle f-20 hover--opacity" @click.prevent="toggleMenu">
						<font-awesome-icon icon="bars" />
					</a>
				</div>
			</div>
		</div>

		<app-nav v-model="menuOpen" />

		<app-filter v-model="filterActive" />
	</header>
</template>

<script>
export default {
	name: 'AppHeader',
	data: function(){
		return {
			menuOpen: false,
			filterActive: false
		};
	},
	computed: {
		availableLocales: function(){
			return this.$i18n.locales.filter( i => i.code !== this.$i18n.locale );
		}
	},
	methods: {
		toggleMenu: function(){
			this.menuOpen = !this.menuOpen;
		},
		toggleFilter: function(){
			this.filterActive = !this.filterActive;
		}
	}
};
</script>

<style lang="scss" scoped>
header{
	padding: 24px 0;

	.locale-switch{
		margin-right: 42px;

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

	.nav-toggle, .search-toggle{
		cursor: pointer;
		margin-left: 42px;
		color: $color-text;
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
				border-top: 1px solid rgba(255,255,255, .2);
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
