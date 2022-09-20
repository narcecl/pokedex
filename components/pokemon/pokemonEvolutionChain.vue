<template>
	<div>
		<div v-if="evolutionChain && evolutionChain.length > 1" class="evolution-chain d-block d-sm-flex flex-wrap align-items-center">
			<div v-for="(pkm, i) in evolutionChain" :key="i" class="evolution-chain__item">
				<div class="d-block d-sm-flex align-items-center">
					<p v-if="pkm.trigger_name === 'level-up'" class="f--sm text-center mr-24">
						<font-awesome-icon class="d-none next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">
							Level {{ pkm.min_level }}
							<span v-if="pkm.require_hapiness" class="fw--bold">+ {{ $t('Hapiness') }}</span>
							<span v-if="pkm.known_move" class="fw--bold">+ knowing {{ pkm.known_move }}</span>
						</span>
					</p>
					<p v-if="pkm.trigger_name === 'use-item' && pkm.item?.name" class="f--sm text-center mr-24">
						<font-awesome-icon class="d-none next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Using') }} <span class="fw--bold">{{ $t(pkm.item.name.replaceAll('-', ' ')) }}</span></span>
					</p>
					<p v-if="pkm.trigger_name === 'trade'" class="f--sm text-center mr-24">
						<font-awesome-icon class="d-none next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Trade') }}</span>
					</p>
					<div class="box--light">
						<nuxt-link :to="{name: 'pokemon-slug', params: { slug: pkm.species_name }}">
							<div class="d-flex justify-content-center">
								<pokemon-image :name="pkm.species_name" :plain="true" :src="pkm.sprites" />
							</div>
							<p class="sub--title text-center mt-8">
								{{ pkm.species_name }}
							</p>
						</nuxt-link>
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
		@media screen and (min-width: $break-sm){
			margin-right: 24px;

			&:last-of-type{
				margin-right: 0;
			}
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
