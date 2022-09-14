<template>
	<span :class="[`bg--${type}`, `pokemon-type--${size}`]" class="pokemon-type">
		{{ getLocaleName }}
	</span>
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
.pokemon{
	&-type{
		border-radius: 6px;
		text-transform: uppercase;
		color: #fff;
		display: inline-block;
		margin-right: 6px;

		&--xs{
			padding: 4px 6px;
			font-size: 10px;
		}

		&--md{
			padding: 6px 12px;
			font-size: 12px;
		}

		&:last-of-type{
			margin-right: 0;
		}
	}
}
</style>
