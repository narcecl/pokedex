<template>
	<div>
		<div v-for="(item, key, i) in damageRelation" :key="i" class="damage-relation__group">
			<p class="sub--title d-block mb-4">
				{{ $t(key.replaceAll('_', ' ')) }}
			</p>
			<pokemon-type v-for="(scopeType, index) in item" :key="index" :type="scopeType.name" size="md" />
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

			Object.entries( damageRelationTemp ).forEach(([key, value]) => {
				if( value.length ) damageRelation[key] = value;
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
