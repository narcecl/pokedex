<template>
	<modal v-model="$store.state.pokemonModal" :size="7" @close="closeModal">
		<div v-if="pokemon" class="pokemon-modal">
			<div class="pokemon-modal__cover">
				<pokemon-image :name="pokemon.name" :types="pokemon.types" :src="pokemon.sprites" :plain="false" />
			</div>
			<div class="pokemon-modal__content">
				<div class="pokemon-modal__block">
					<p class="f--sm">
						N.º {{ $methods.pad(pokemon.id) }}
					</p>

					<div class="d-flex align-items-center mb-12">
						<h6 class="heading--4 mr-16">
							{{ pokemon.name }}
						</h6>
						<pokemon-types :types="pokemon.types" />
					</div>

					<!-- <p>{{ $t(`description_${pokemon.name}`) }}</p> -->
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, dolore voluptas! Magni cupiditate minima at dignissimos iste maiores reprehenderit animi delectus, illum modi impedit, harum laborum incidunt dolores et ea!
					</p>
				</div>

				<div class="pokemon-modal__block">
					<div class="row total mini">
						<div class="col-12 col-sm">
							<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
								weight
							</h6>
							<p>
								{{ Math.round((pokemon.weight * 0.1) * 100) / 100 }} kg
							</p>
						</div>
						<div class="col-12 col-sm">
							<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
								height
							</h6>
							<p>
								{{ Math.round((pokemon.height * 0.1) * 100) / 100 }} m
							</p>
						</div>
						<div class="col-12 col-sm">
							<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
								abilities
							</h6>
							<p>
								<span v-for="(ability, index) in pokemon.abilities" :key="index" class="d-block">
									{{ ability.ability.name }} <span v-if="ability.is_hidden">(hidden)</span>
								</span>
							</p>
						</div>
					</div>
				</div>

				<div class="pokemon-modal__block">
					<accordion title="Sprites" group="pokemon-details">
						<div class="row total mini justify-content-center">
							<div v-for="(sprite, key, i) in sprites" :key="i" class="col-6 col-sm-3">
								<div class="text-center">
									<nuxt-img :src="sprite" />
									<p class="f--xs text-uppercase">
										{{ key.replaceAll('_', ' ') }}
									</p>
								</div>
							</div>
						</div>
					</accordion>

					<accordion title="Damage relations" group="pokemon-details">
						<pokemon-damage-relation :type="pokemon.types[0].type.name" />
					</accordion>

					<accordion title="Evolution chain" group="pokemon-details">
						<div v-if="evolutionChain && evolutionChain.length">
							<div v-for="(pkm, i) in evolutionChain" :key="i">
								{{ pkm.species_name }}
							</div>
						</div>
						<p v-else>
							this pokemon does not have evolucion chain.
						</p>
					</accordion>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
	name: 'PokemonModal',
	props: {
		pokemon: { type: Object, default: () => ({}) }
	},
	data: function(){
		return {
			specie: null,
			evolutionChain: null
		};
	},
	computed: {
		sprites: function(){
			const sprites = {};

			Object.entries( this.pokemon.sprites ).forEach(([key, value]) => {
				if( typeof value === 'string' ) sprites[key] = value;
			});

			return sprites;
		}
	},
	created: async function(){
		this.specie = await this.getSpecie( this.pokemon.id ).then( response => response );
		this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url ).then( response => response );
	},
	methods: {
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON']),
		...mapActions(['getEvolutionChain', 'getSpecie']),

		closeModal: function(){
			this.SET_POKEMON_MODAL( false );
			this.SELECT_POKEMON( null );
		}
	}
};
</script>

<style lang="scss" scoped>
.pokemon-modal{
	background-color: #fff;

	&__block{
		+ .pokemon-modal__block{
			margin-top: 32px;
		}
	}

	&__cover{
		figure{
			width: 100%;
			padding: 12px;
			height: 140px;
			position: relative;

			&:deep img{
				position: absolute;
				left: 32px;
				bottom: -50%;
				max-width: 30%;
				z-index: 1;
			}
		}
	}

	&__types{
		padding: 16px 32px 0;
	}

	&__content{
		padding: 15% 32px 32px;
	}
}
</style>
