<template>
	<div class="pokemon-type">
		<div :class="[`bg--${type}`, `size--${size}`]" class="d-flex align-items-center justify-content-center">
			<img v-if="size === 'md'" :src="require(`~/assets/images/svg/${type}.svg`)" :alt="getLocaleName" aria-hidden="true">
			<span>{{ getLocaleName }}</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PokemonType',
	props: {
		type: { type: String, required: true },
		size: { type: String, default: 'xs' }
	},
	computed: {
		...mapGetters(['getLocaleTypeName']),

		getLocaleName: function(){
			return this.getLocaleTypeName({ lang: this.$i18n.locale, type: this.type });
		}
	}
};
</script>

<style lang="scss" scoped>
.pokemon-type{
	div{
		border-radius: 6px;
		text-transform: uppercase;
		color: #fff;
		display: inline-block;
		letter-spacing: .3px;

		img{
			width: 14px;
			margin-right: 6px;
		}

		&.size{
			&--xs{
				min-width: 60px;
				padding: 6px 8px;
				font-size: 10px;

				span{
					text-align: center;
					width: 100%;
				}
			}

			&--md{
				padding: 8px 14px;
				font-size: 12px;
				min-width: 110px;
			}
		}
	}
}
</style>
