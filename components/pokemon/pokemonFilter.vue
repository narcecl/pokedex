<template>
	<div class="filter">
		<div class="row total mini">
			<div class="col-12 col-sm-8">
				<custom-input v-model="name" label="Name" @input="setName" />
			</div>
			<div class="col-12 col-sm">
				<custom-select v-model="type" label="Type" :options="pokemonTypes" @selected="setType" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: 'PokemonFilter',
	data: function(){
		return {
			name: '',
			type: ''
		};
	},
	computed: {
		...mapState(['orderCriteria']),
		...mapGetters(['pokemonTypes'])
	},
	methods: {
		...mapMutations(['setFilterName', 'setSelectedType']),

		setName: function(){
			this.setFilterName( this.name );
		},
		setType: function(){
			this.setSelectedType( this.type );
		}
	}
};
</script>

<style lang="scss" scoped>
.filter{
	padding: 16px;
	background: #f9f9f9;
	border-radius: 8px;
}
</style>
