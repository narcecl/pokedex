<template>
	<div class="pokemon-info">
		<div class="row total mini align-items-center">
			<div :class="classController">
				<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
					{{ $t('weight') }}
				</h6>
				<p>
					{{ Math.round((weight * 0.1) * 100) / 100 }} kg
				</p>
			</div>
			<div :class="classController">
				<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
					{{ $t('height') }}
				</h6>
				<p>
					{{ Math.round((height * 0.1) * 100) / 100 }} m
				</p>
			</div>
			<div v-if="generation" :class="classController">
				<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
					{{ $t('generation') }}
				</h6>
				<p>
					{{ generation.name }} ({{ generation.code }})
				</p>
			</div>
			<div v-if="specieName" :class="classController">
				<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
					{{ $t('specie') }}
				</h6>
				<p>
					{{ specieName }}
				</p>
			</div>
			<div :class="classController">
				<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
					National Dex
				</h6>
				<p>
					N.º {{ $methods.pad(specie.id) }}
				</p>
			</div>
			<div v-for="(dex, i) in pokedexNumbers" :key="i" :class="classController">
				<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
					{{ dex.pokedex.name.split('-').join(' ') }} dex
				</h6>
				<p>
					N.º {{ $methods.pad(dex.entry_number) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'PokemonInfo',
	props: {
		specie: { type: Object, required: true },
		weight: { type: [String, Number], required: true },
		height: { type: [String, Number], required: true },
		compact: { type: Boolean, default: false }
	},
	computed: {
		...mapState(['regions']),
		...mapGetters(['getGenerationInfo']),

		classController: function(){
			return `col-12 ${this.compact ? 'col-sm-4' : 'col-sm-3'}`;
		},
		generation: function(){
			if( !this.specie ) return false;
			return this.getGenerationInfo( this.specie.generation.name );
		},
		specieName: function(){
			if( !this.specie ) return false;
			const specie = this.specie.genera.find( item => item.language.name === this.$i18n.locale );
			return specie.genus;
		},
		pokedexNumbers: function(){
			if( !this.specie ) return false;
			const localRegions = this.regions.map( region => region.dexName );
			return this.specie.pokedex_numbers.filter( dex => localRegions.includes( dex.pokedex.name ));
		}
	}
};
</script>
