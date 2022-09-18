<template>
	<nav>
		<div class="container">
			<ul class="align-items-center justify-content-between">
				<li v-for="(region, index) in getRegionNames" :key="index" class="nav__item">
					<nuxt-link :to="`/${region.slug}`">
						{{ region.name }}
					</nuxt-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'AppNav',
	computed: {
		...mapGetters(['getRegionNames'])
	}
};
</script>

<style lang="scss" scoped>
nav{
	@media screen and (min-width: $break-sm){
		margin-top: 32px;
	}

	ul{
		display: none;
		padding-top: 24px;
		border-top: 1px solid rgba($color-text,.2);

		@media screen and (min-width: $break-sm){
			display: flex;
		}

		.nav__item{
			a{
				color: $color-text;
				text-transform: uppercase;
				font-weight: 700;
				text-decoration: none;
				font-size: 14px;
				@include transition;
				display: block;

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

.dark{
	header{
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
	}
}
</style>
