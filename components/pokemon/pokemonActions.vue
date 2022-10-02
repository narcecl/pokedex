<template>
	<div :class="`actions_links--${view}`" class="actions_links d-flex justify-content-end">
		<ul class="d-flex align-items-center">
			<li v-if="permalink">
				<nuxt-link :to="{name: 'pokemon-slug', params: { slug: specie.name }}" class="hover--opacity" title="Permalink">
					<font-awesome-icon icon="arrow-up-right-from-square" aria-hidden="true" />
				</nuxt-link>
			</li>
			<li>
				<pokemon-action-fav :specie="specie" />
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'PokemonActions',
	props: {
		specie: { type: Object, default: () => ({}) },
		permalink: { type: Boolean, default: true },
		view: { type: String, validator: value => ['modal', 'card', 'single'].includes( value.toLowerCase()), default: 'single' }
	}
};
</script>

<style lang="scss" scoped>
.actions_links{
	ul{
		li{
			margin-right: 24px;
			&:last-of-type{
				margin-right: 0;
			}
			*{
				color: $color-text;
				font-size: 24px;
				@include transition;
			}
		}
	}

	&--modal{
		padding: 16px 32px;
	}

	&--card{
		ul{
			li{
				margin-right: 16px;
				&:last-of-type{
					margin-right: 0;
				}
				*{
					color: $color-text;
					font-size: 16px;
					@include transition;
				}
			}
		}
	}
}

.dark{
	.actions_links{
		&--modal, &--single{
			ul{
				li{
					*{
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
