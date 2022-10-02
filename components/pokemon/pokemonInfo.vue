<template>
	<div class="pokemon-info">
		<div class="section__block">
			<div class="row total mini align-items-center">
				<div v-if="compact" :class="classController">
					<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
						National Dex
					</h6>
					<p>
						N.º {{ $methods.pad(specie.id) }}
					</p>
				</div>
				<div :class="classController">
					<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
						{{ $t('weight') }}
					</h6>
					<p>
						{{ Math.round((weight * 0.2205) * 100) / 100 }} lbs /
						{{ Math.round((weight * 0.1) * 100) / 100 }} kg
					</p>
				</div>
				<div :class="classController">
					<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
						{{ $t('height') }}
					</h6>
					<p>
						{{ $methods.heightToFeet(height) }} /
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
				<div v-if="habitat" :class="classController">
					<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
						{{ $t('habitat') }}
					</h6>
					<p>
						{{ $methods.normalizeString(habitatName) }}
					</p>
				</div>
				<div :class="classController">
					<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
						{{ $t('Catch rate') }}
					</h6>
					<p>
						{{ specie.capture_rate }}
					</p>
				</div>
				<div :class="classController">
					<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
						{{ $t('Egg Group') }}
					</h6>
					<p>
						{{ specieEggGroup }}
					</p>
				</div>
				<div :class="classController">
					<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
						{{ $t('Base Happiness') }}
					</h6>
					<p>
						{{ specie.base_happiness }}
					</p>
				</div>
			</div>
		</div>
		<div v-if="!compact" class="dex-entries section__block">
			<div class="row total mini align-items-center">
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
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'PokemonInfo',
	props: {
		specie: { type: Object, required: true },
		habitat: { type: Object, default: () => ({}) },
		weight: { type: [String, Number], required: true },
		height: { type: [String, Number], required: true },
		compact: { type: Boolean, default: false }
	},
	computed: {
		...mapState(['regions', 'eggGroups']),
		...mapGetters(['getGenerationInfo']),

		classController: function(){
			return `col-6 ${this.compact ? 'col-sm-4' : 'col-sm-3'}`;
		},
		generation: function(){
			if( !this.specie ) return false;
			return this.getGenerationInfo( this.specie.generation.name );
		},
		specieName: function(){
			if( !this.specie ) return false;
			const specie = this.specie.genera.find( item => item.language.name === this.$i18n.locale );
			return specie ? specie.genus : false;
		},
		habitatName: function(){
			if( !this.habitat ) return false;
			const habitat = this.habitat.names.find( item => item.language.name === this.$i18n.locale );
			return habitat ? habitat.name : false;
		},
		pokedexNumbers: function(){
			if( !this.specie ) return false;
			const localRegions = this.regions.map( region => region.dexName );
			return this.specie.pokedex_numbers.filter( dex => localRegions.includes( dex.pokedex.name ));
		},
		specieEggGroup: function(){
			if( this.eggGroups.length ){
				const eggGroup = this.specie.egg_groups.map( eggGroupItem => {
					return this.eggGroups.find( eggGroup => eggGroup.name === eggGroupItem.name );
				});

				const eggGroupLocale = eggGroup.map( eggGroupItem => {
					const eggGroup = eggGroupItem.names.find( item => item.language.name === this.$i18n.locale );
					return eggGroup ? eggGroup.name : false;
				});

				return eggGroupLocale.join( ', ' );
			}
			return false;
		}
	}
};
</script>

<style lang="scss" scoped>
.dex-entries{
	border-top: 1px solid rgba(0,0,0,.1);
	padding-top: 32px;
}

.dark{
	.dex-entries{
		border-top-color: rgba(255,255,255,.1) !important;
	}
}
</style>
