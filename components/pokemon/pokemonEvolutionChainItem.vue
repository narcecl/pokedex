<template>
	<div :class="{'evolution__item--compact': compact}" class="evolution__item d-sm-flex align-items-center justify-content-between">
		<div v-if="pokemon.trigger_name === 'level-up'" class="w-100 f--sm text-center mr-sm-32 mb-32 mb-sm-0">
			<font-awesome-icon class="d-none d-sm-inline next color--normal f-28" icon="arrow-right" aria-hidden="true" />
			<div class="evolution__item__info">
				<p class="d-block f--xs mb-4 mt-sm-4 mb-sm-0">
					Level {{ pokemon.min_level }}
					<span v-if="pokemon.require_hapiness" class="fw--bold">+ {{ $t('Hapiness') }}</span>
					<span v-if="pokemon.known_move" class="fw--bold">+ knowing {{ pokemon.known_move }}</span>
				</p>
				<font-awesome-icon class="d-inline d-sm-none next color--normal f-28" icon="arrow-down" aria-hidden="true" />
			</div>
		</div>
		<div v-else-if="pokemon.trigger_name === 'use-item' && pokemon?.item" class="w-100 f--sm text-center mr-sm-32 mb-32 mb-sm-0">
			<font-awesome-icon class="d-none d-sm-inline next color--normal f-28" icon="arrow-right" aria-hidden="true" />
			<p class="evolution__item__info">
				<picture>
					<img :src="require(`~/assets/images/evolution/${pokemon.item}.png`)" :alt="$t(itemName)" width="24" />
				</picture>
				<span class="d-block f--xs mb-4 mt-sm-4 mb-sm-0">{{ $t('Using') }} <span class="fw--bold">{{ $t(itemName) }}</span></span>
				<font-awesome-icon class="d-inline d-sm-none next color--normal f-28" icon="arrow-down" aria-hidden="true" />
			</p>
		</div>
		<div v-else-if="pokemon.trigger_name === 'trade'" class="w-100 f--sm text-center mr-sm-32 mb-32 mb-sm-0">
			<font-awesome-icon class="d-none d-sm-inline next color--normal f-28" icon="arrow-right" aria-hidden="true" />
			<p class="evolution__item__info">
				<span class="d-block f--xs mb-4 mt-sm-4 mb-sm-0">{{ $t('Trade') }}</span>
				<font-awesome-icon class="d-inline d-sm-none next color--normal f-28" icon="arrow-down" aria-hidden="true" />
			</p>
		</div>
		<div v-if="!compact" class="evolution__item__card">
			<pokemonCard :details="pokemon" :permalink="false" />
		</div>
		<div v-else class="box--light">
			<nuxt-link :to="{name: 'pokemon-slug', params: { slug: pokemon.species_name }}">
				<div class="d-flex justify-content-center">
					<pokemon-image :name="pokemon.species_name" :plain="true" :src="pokemon.sprites" :width="compact ? 72 : 128" />
				</div>
				<p class="sub--title text-center mt-8">
					{{ pokemon.species_name }}
				</p>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PokemonEvolutionChainItem',
	props: {
		pokemon: { type: Object, required: true },
		compact: { type: Boolean, default: false }
	},
	computed: {
		itemName: function(){
			return this.pokemon.item.replaceAll( '-', ' ' );
		}
	}
};
</script>

<style lang="scss" scoped>
.evolution__item{
	&--compact{
		.evolution__item__card{
			min-width: auto;
		}
	}
	&__info{
		margin-top: 12px;
		padding-top: 12px;

		@media screen and (min-width: $break-sm){
			border-top: 1px solid $color-border--dark;
		}
	}
	&__card{
		min-width: 180px;
	}
}

.dark{
	.evolution__item{
		&__info{
			@media screen and (min-width: $break-sm){
				border-top-color: $color-border--light;
			}
		}
	}
}
</style>
