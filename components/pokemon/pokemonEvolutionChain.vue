<template>
	<div>
		<div v-if="evolutionChain && evolutionChain.length > 1" class="evolution-chain d-flex align-items-center justify-content-center">
			<div v-for="(pkm, i) in evolutionChain" :key="i" class="evolution-chain__item">
				<div class="d-flex align-items-center">
					<p v-if="pkm.trigger_name === 'level-up'" class="f--sm text-center mr-32">
						<font-awesome-icon class="next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">
							Level {{ pkm.min_level }}
							<span v-if="pkm.require_hapiness" class="fw--bold">+ {{ $t('Hapiness') }}</span>
							<span v-if="pkm.known_move" class="fw--bold">+ knowing {{ pkm.known_move }}</span>
						</span>
					</p>
					<p v-if="pkm.trigger_name === 'use-item' && pkm.item" class="f--sm text-center mr-32">
						<font-awesome-icon class="next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Using') }} <span class="fw--bold">{{ $t(pkm.item.name.replaceAll('-', ' ')) }}</span></span>
					</p>
					<p v-if="pkm.trigger_name === 'trade'" class="f--sm text-center mr-32">
						<font-awesome-icon class="next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Trade') }}</span>
					</p>
					<div>
						<pokemon-image :name="pkm.species_name" :plain="true" :src="pkm.sprites" />
						<p class="sub--title text-center mt-8">
							{{ pkm.species_name }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<p v-else>
			{{ $t('without_evolution_chain') }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'PokemonEvolutionChain',
	props: {
		evolutionChain: { type: Array, required: true, default: () => ([]) }
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
	&:deep(.pokemon-image){
		img{
			max-width: 90px;
		}
	}
}

.dark{
	.evolution-chain{
		&__item{
			.next{
				color: #fff;
			}
		}
	}
}
</style>
