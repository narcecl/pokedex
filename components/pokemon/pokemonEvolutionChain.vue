<template>
	<div class="evolution-chain">
		<div v-if="evolutionChain && evolutionChain.length > 1" :class="compact ? 'd-flex' : 'row total'" class="align-items-center">
			<div v-for="(pkm, i) in evolutionChain" :key="i" :class="classController(pkm.trigger_name)" class="evolution-chain__item">
				<div class="d-sm-flex align-items-center justify-content-between">
					<p v-if="pkm.trigger_name === 'level-up'" class="f--sm text-center mr-sm-24 mb-32 mb-sm-0">
						<font-awesome-icon class="d-none d-sm-inline next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">
							Level {{ pkm.min_level }}
							<span v-if="pkm.require_hapiness" class="fw--bold">+ {{ $t('Hapiness') }}</span>
							<span v-if="pkm.known_move" class="fw--bold">+ knowing {{ pkm.known_move }}</span>
						</span>
						<font-awesome-icon class="d-inline d-sm-none next f-28" icon="chevron-down" aria-hidden="true" />
					</p>
					<p v-else-if="pkm.trigger_name === 'use-item' && pkm.item?.name" class="f--sm text-center mr-sm-24 mb-32 mb-sm-0">
						<font-awesome-icon class="d-none d-sm-inline next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Using') }} <span class="fw--bold">{{ $t(pkm.item.name.replaceAll('-', ' ')) }}</span></span>
						<font-awesome-icon class="d-inline d-sm-none next f-28" icon="chevron-down" aria-hidden="true" />
					</p>
					<p v-else-if="pkm.trigger_name === 'trade'" class="f--sm text-center mr-sm-24 mb-32 mb-sm-0">
						<font-awesome-icon class="d-none d-sm-inline next f-28" icon="chevron-right" aria-hidden="true" />
						<span class="d-block f--xs mt-4">{{ $t('Trade') }}</span>
						<font-awesome-icon class="d-inline d-sm-none next f-28" icon="chevron-down" aria-hidden="true" />
					</p>
					<div v-if="!compact" :class="pkm.trigger_name ? 'w-sm-65' : 'w-sm-100'">
						<nuxt-link :to="{name: 'pokemon-slug', params: { slug: pkm.species_name }}">
							<pokemonCard :details="pkm" />
						</nuxt-link>
					</div>
					<div v-else>
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
		</div>
		<p v-else-if="evolutionChain && evolutionChain.length === 1">
			{{ $t('without_evolution_chain') }}
		</p>
		<div v-else class="evolution-chain__skeleton d-block d-sm-flex flex-wrap align-items-center">
			<div v-for="n in 3" :key="n">
				<skeleton type="card" />
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
	},
	methods: {
		classController: function( trigger ){
			if( this.compact ) return 'compact';

			return ['col-12', 'col-sm', {
				'col-sm-3': !this.compact && trigger,
				'col-sm-2': !this.compact && !trigger
			}];
		}
	}
};
</script>

<style lang="scss" scoped>
.evolution-chain{
	&__item{
		&.compact{
			@media screen and (min-width: $break-sm){
				margin-right: 24px;

				&:last-of-type{
					margin-right: 0;
				}
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
