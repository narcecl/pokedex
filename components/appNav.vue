<template>
	<nav :class="{ mobile: isMobileViewport, open: value }">
		<div class="container">
			<ul class="align-items-center justify-content-between">
				<li v-for="(region, index) in getRegionNames" :key="index" class="nav__item">
					<nuxt-link :to="`/${region.slug}`" @click.native="chooseRegion">
						{{ region.name }}
					</nuxt-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import mobile from '~/mixins/mobile';

export default {
	name: 'AppNav',
	mixins: [mobile],
	props: {
		value: { type: Boolean, default: false }
	},
	computed: {
		...mapGetters(['getRegionNames'])
	},
	methods: {
		chooseRegion: function(){
			this.$emit( 'input', !this.value );
		}
	}
};
</script>

<style lang="scss" scoped>
nav{
	@media screen and (min-width: $break-sm){
		margin-top: 32px;
	}

	&.mobile{
		&.open{
			ul{
				display: block;
			}
		}
	}

	ul{
		display: none;
		margin-top: 24px;
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
