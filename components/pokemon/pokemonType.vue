<template>
	<span :class="`bg--${type}`" class="pokemon--type">
		{{ getLocaleName }}
	</span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PokemonType',
	props: {
		type: { type: String, required: true }
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
	&--type{
		padding: 4px 6px;
		border-radius: 6px;
		text-transform: uppercase;
		font-size: 10px;
		color: #fff;
		display: inline-block;

		+ .pokemon--type{
			margin-left: 4px;
		}
	}
}
</style>
