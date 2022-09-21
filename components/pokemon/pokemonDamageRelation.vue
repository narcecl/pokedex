<template>
	<div v-if="damageRelation">
		<div v-for="(item, key, i) in damageRelation" :key="i" class="damage-relation__group">
			<p class="sub--title d-block mb-8">
				{{ $t(key.replaceAll('_', ' ')) }}
			</p>
			<pokemon-types :types="item" size="md" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PokemonDamageRelation',
	props: {
		type: { type: String, required: true }
	},
	computed: {
		...mapGetters(['getTypeInfo']),

		damageRelation: function(){
			const damageRelationTemp = this.getTypeInfo( this.type );
			const damageRelation = {};
			if( !damageRelationTemp ) return false;

			Object.entries( damageRelationTemp ).forEach(([key, value]) => {
				const mappedArr = value.map( item => ({ type: { name: item.name } }));
				if( value.length ) damageRelation[key] = mappedArr;
			});

			return damageRelation;
		}
	}
};
</script>

<style lang="scss" scoped>
.damage-relation__group{
	margin-bottom: 24px;

	&:last-of-type{
		margin-bottom: 0;
	}
}
</style>
