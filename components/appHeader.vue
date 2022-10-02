<template>
	<header>
		<div class="container">
			<div class="row total align-items-center justify-content-between">
				<div class="col-12 col-sm text-center text-sm-left">
					<nuxt-link class="d-inline-block" to="/">
						<div class="d-flex align-items-center justify-content-center justify-content-sm-start">
							<img :src="require('~/static/images/pokemon.svg')" alt="Logo Pokémon" width="130">
							<p class="f--xs color--muted ml-32">
								Regional Pokédex
							</p>
						</div>
					</nuxt-link>
				</div>
				<div class="col-12 col-sm">
					<ul class="action_links d-flex align-items-center justify-content-center justify-content-sm-end">
						<li v-for="locale in availableLocales" :key="locale.code" class="locale-switch">
							<a href="#" @click.prevent="$i18n.setLocale(locale.code)">
								<font-awesome-icon icon="earth-americas" class="mr-4" />
								{{ locale.name }}
							</a>
						</li>
						<li>
							<dark-mode />
						</li>
						<li>
							<nuxt-link to="/favorites" class="f-20 hover--opacity">
								<font-awesome-icon icon="heart" />
							</nuxt-link>
						</li>
						<li>
							<a href="#" class="search-toggle f-20 hover--opacity" @click.prevent="toggleFilter">
								<font-awesome-icon icon="magnifying-glass" />
							</a>
						</li>
						<li class="d-inline d-sm-none">
							<a href="#" class="nav-toggle f-20 hover--opacity" @click.prevent="toggleMenu">
								<div :class="{ open: menuOpen }" class="bars">
									<span /><span /><span /><span />
								</div>
							</a>
						</li>
					</ul>
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

	.action_links{
		li{
			margin-left: 42px;
			&:first-of-type{margin-left: 0;}
		}
		.locale-switch{
			a{
				color: $color-text;
				text-decoration: none;
				font-weight: 600;
				@include transition;

				&:hover{
					opacity: .6;
				}
			}
		}

		.nav-toggle, .search-toggle{
			cursor: pointer;
			color: $color-text;
		}

		.nav-toggle{
			display: inline-block;
			transform: scale(.45);
			.bars{
				width: 60px;
				height: 22px;
				position: relative;
				-webkit-transform: rotate(0deg);
				-moz-transform: rotate(0deg);
				-o-transform: rotate(0deg);
				transform: rotate(0deg);
				-webkit-transition: .5s ease-in-out;
				-moz-transition: .5s ease-in-out;
				-o-transition: .5s ease-in-out;
				transition: .5s ease-in-out;
				cursor: pointer;

				&.open{
					span{
						&:nth-child(1) {
							top: 18px;
							width: 0%;
							left: 50%;
						}
						&:nth-child(2) {
							-webkit-transform: rotate(45deg);
							-moz-transform: rotate(45deg);
							-o-transform: rotate(45deg);
							transform: rotate(45deg);
						}
						&:nth-child(3) {
							-webkit-transform: rotate(-45deg);
							-moz-transform: rotate(-45deg);
							-o-transform: rotate(-45deg);
							transform: rotate(-45deg);
						}
						&:nth-child(4) {
							top: 18px;
							width: 0%;
							left: 50%;
						}
					}
				}

				span{
					display: block;
					position: absolute;
					height: 9px;
					width: 100%;
					background: #fff;
					border-radius: 9px;
					opacity: 1;
					left: 0;
					-webkit-transform: rotate(0deg);
					-moz-transform: rotate(0deg);
					-o-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-transition: .25s ease-in-out;
					-moz-transition: .25s ease-in-out;
					-o-transition: .25s ease-in-out;
					transition: .25s ease-in-out;

					&:nth-child(1) {
						top: 0px;
					}

					&:nth-child(2), &:nth-child(3) {
						top: 18px;
					}

					&:nth-child(4) {
						top: 36px;
					}
				}
			}
		}
	}
}

.dark{
	header{
		.action_links{
			li{
				*{color: #fff;}
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
