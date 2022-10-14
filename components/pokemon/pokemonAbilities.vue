<template>
	<div class="abilities">
		<div v-if="ready">
			<div v-for="(ability, index) in abilitiesDetail" :key="index" class="abilities__item">
				<div :class="{'box--light': !simple}">
					<div class="d-flex align-items-center">
						<p class="sub--title">
							{{ getName(index) }}
						</p>
						<span v-if="ability.is_hidden" class="f--xs color--muted text-uppercase ml-12">
							{{ $t('hidden') }}
						</span>
					</div>
					<p class="f--sm">
						{{ getDescription(index) }}
					</p>
				</div>
			</div>
		</div>
		<div v-else>
			<div v-for="n in 2" :key="n">
				<skeleton type="ability" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'PokemonAbilities',
	props: {
		abilities: { type: Array, required: true, default: () => ([]) },
		simple: { type: Boolean, default: false }
	},
	data: function(){
		return {
			ready: false,
			abilitiesDetail: false
		};
	},
	created: async function(){
		if( this.abilities.length ){
			this.abilitiesDetail = await this.getAbilities( this.abilities );
			if( this.abilitiesDetail.length ) this.ready = true;
		}
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
