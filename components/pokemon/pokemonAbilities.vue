<template>
	<div class="abilities">
		<div v-for="(ability, index) in abilitiesDetail" :key="index" class="abilities__item">
			<p class="sub--title">
				{{ getName(index) }}  <span v-if="ability.is_hidden">({{ $t('hidden') }})</span>
			</p>
			<p class="f--sm">
				{{ getDescription(index) }}
			</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'PokemonAbilities',
	props: {
		abilities: { type: Array, required: true }
	},
	data: function(){
		return {
			abilitiesDetail: null
		};
	},
	created: async function(){
		this.abilitiesDetail = await this.getAbilities( this.abilities );
	},
	methods: {
		...mapActions(['getAbilities']),

		getName: function( index ){
			const name = this.abilitiesDetail[index].names.find( item => item.language.name === this.$i18n.locale );
			if( !name ) return '';

			return name.name;
		},
		getDescription: function( index ){
			const description = this.abilitiesDetail[index].effect_entries.find( item => item.language.name === this.$i18n.locale );
			if( !description ) return '';

			return description.flavor_text;
		}
	}
};
</script>

<style lang="scss" scoped>
.abilities{
	&__item{
		margin-bottom: 16px;

		&:last-of-type{
			margin-bottom: 0;
		}
	}
}
</style>
