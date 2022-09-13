<template>
	<div>
		<div v-if="evolutionChain && evolutionChain.length > 1" class="evolution-chain d-flex align-items-center justify-content-center">
			<div v-for="(pkm, i) in evolutionChain" :key="i" class="evolution-chain__item">
				<div class="d-flex align-items-center">
					<p v-if="pkm.trigger_name === 'level-up'" class="f--sm text-center mr-32">
						<span class="down fa-solid fa-chevron-right f-28" aria-hidden="true" />
						<span class="d-block f--xs mt-4">Level {{ pkm.min_level }}</span>
					</p>
					<p v-if="pkm.trigger_name === 'use-item'" class="f--sm text-center mr-32">
						<span class="down fa-solid fa-chevron-right f-28" aria-hidden="true" />
						<span class="d-block f--xs mt-4">Using <span class="fw--bold">{{ pkm.item.replaceAll('-', ' ') }}</span></span>
					</p>
					<p v-if="pkm.trigger_name === 'trade'" class="f--sm text-center mr-32">
						<span class="down fa-solid fa-chevron-right f-28" aria-hidden="true" />
						<span class="d-block f--xs mt-4">Trade</span>
					</p>
					<div>
						<pokemon-image :name="pkm.species_name" :plain="true" :src="pkm.sprites" />
						<p class="text-uppercase text-center f--sm fw--bold mt-8">
							{{ pkm.species_name }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<p v-else>
			this pokemon does not have evolucion chain.
		</p>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'PokemonEvolutionChain',
	props: {
		specie: { type: Object, required: true }
	},
	data: function(){
		return {
			evolutionChain: null
		};
	},
	created: async function(){
		this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url ).then( response => response );
	},
	methods: {
		...mapActions(['getEvolutionChain'])
	}
};
</script>

<style lang="scss" scoped>
.evolution-chain{
	&__item{
		margin-right: 32px;
		&:last-of-type{
			margin-right:0;
		}
	}
	&:deep .pokemon-image{
		img{
			max-width: 90px;
		}
	}
}
</style>
