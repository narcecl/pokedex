<template>
	<div class="evolution-chain">
		<div v-if="evolutionChain && evolutionChain.length" class="d-block d-sm-flex">
			<div v-for="pokemon in evolutionChain" :key="pokemon.id" class="d-block d-sm-flex evolution-chain__item">
				<pokemon-evolution-chain-item :pokemon="pokemon" :compact="compact" />

				<div v-if="pokemon.evolutionSplit.length" class="d-flex d-sm-block justify-content-between evolution-chain__item__split">
					<div v-for="evo in pokemon.evolutionSplit" :key="evo.id"  class="evolution-chain__item__split__item">
						<pokemon-evolution-chain-item :pokemon="evo" :compact="compact" />
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
	}
};
</script>

<style lang="scss" scoped>
.evolution-chain{
	&__item{
		+ .evolution-chain__item{
			margin-left: 0;
			margin-top: 24px;

			@media screen and (min-width: $break-sm){
				margin-left: 32px;
			}
		}

		&__split{
			@media screen and (min-width: $break-sm){
				margin-left: 32px;
			}

			&__item{
				@media screen and (min-width: $break-sm){
					margin-bottom: 32px;
					&:last-of-type{margin-bottom: 0;}
				}
			}
		}

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
