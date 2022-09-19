<template>
	<div class="pokemon-type">
		<span :class="[`bg--${type}`, `size--${size}`]">
			{{ getLocaleName }}
		</span>
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
	span{
		border-radius: 6px;
		text-transform: uppercase;
		color: #fff;
		display: inline-block;

		&.size{
			&--xs{
				padding: 4px 8px;
				font-size: 10px;
			}

			&--md{
				padding: 6px 12px;
				font-size: 12px;
			}
		}
	}
}
</style>
