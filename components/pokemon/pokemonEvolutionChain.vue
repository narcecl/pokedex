<template>
	<div class="evolution-chain">
		<div v-if="evolutionChain && evolutionChain.length > 1" class="d-block d-sm-flex flex-wrap align-items-center">
			<div v-for="(pkm, i) in evolutionChain" :key="i" class="evolution-chain__item">
				<div class="d-sm-flex align-items-center">
					<p v-if="pkm.trigger_name === 'level-up'" class="f--sm text-center mr-sm-24 my-12 my-sm-0">
						<font-awesome-icon class="d-none d-sm-inline next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">
							Level {{ pkm.min_level }}
							<span v-if="pkm.require_hapiness" class="fw--bold">+ {{ $t('Hapiness') }}</span>
							<span v-if="pkm.known_move" class="fw--bold">+ knowing {{ pkm.known_move }}</span>
						</span>
						<font-awesome-icon class="d-inline d-sm-none next f-28" icon="chevron-down" aria-hidden="true" />
					</p>
					<p v-else-if="pkm.trigger_name === 'use-item' && pkm.item?.name" class="f--sm text-center mr-sm-24 my-12 my-sm-0">
						<font-awesome-icon class="d-none d-sm-inline next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Using') }} <span class="fw--bold">{{ $t(pkm.item.name.replaceAll('-', ' ')) }}</span></span>
						<font-awesome-icon class="d-inline d-sm-none next f-28" icon="chevron-down" aria-hidden="true" />
					</p>
					<p v-else-if="pkm.trigger_name === 'trade'" class="f--sm text-center mr-sm-24 my-12 my-sm-0">
						<font-awesome-icon class="d-none d-sm-inline next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Trade') }}</span>
						<font-awesome-icon class="d-inline d-sm-none next f-28" icon="chevron-down" aria-hidden="true" />
					</p>
					<div class="box--light">
						<nuxt-link :to="{name: 'pokemon-slug', params: { slug: pkm.species_name }}">
							<div class="d-flex justify-content-center">
								<pokemon-image :name="pkm.species_name" :plain="true" :src="pkm.sprites" :width="compact ? 72 : 128" />
							</div>
							<p class="sub--title text-center mt-8">
								{{ pkm.species_name }}
							</p>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
		<p v-else-if="evolutionChain && !evolutionChain.length">
			{{ $t('without_evolution_chain') }}
		</p>
		<div v-else class="evolution-chain__skeleton d-block d-sm-flex flex-wrap align-items-center">
			<div v-for="n in 3" :key="n">
				<skeleton type="evolution" data-class="d-flex flex-wrap justify-content-center" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PokemonEvolutionChain',
	props: {
		evolutionChain: { type: [Array, Boolean], required: true, default: false },
		compact: { type: Boolean, default: false }
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

	&__skeleton{
		> div{
			margin-bottom: 24px;
			@media screen and (min-width: $break-sm){
				margin-bottom: 0;
				margin-right: 24px;
			}
			&:last-of-type{margin: 0;}
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
