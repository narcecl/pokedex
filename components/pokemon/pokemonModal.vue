<template>
	<modal v-model="$store.state.pokemonModal" :size="7" :ready="ready" @close="closeModal">
		<div v-if="pokemon && ready" class="pokemon-modal">
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
						<pokemon-types :types="pokemon.types" size="md" />
					</div>

					<p v-if="description">
						{{ description }}
					</p>
					<p v-else>
						{{ $t('no_description_pokemon') }}
					</p>
				</div>

				<div class="pokemon-modal__block">
					<div class="row total mini">
						<div class="col-12 col-sm">
							<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
								{{ $t('weight') }}
							</h6>
							<p>
								{{ Math.round((pokemon.weight * 0.1) * 100) / 100 }} kg
							</p>
						</div>
						<div class="col-12 col-sm">
							<h6 class="f--sm text--uppercase fw--bold d-block text-uppercase">
								{{ $t('height') }}
							</h6>
							<p>
								{{ Math.round((pokemon.height * 0.1) * 100) / 100 }} m
							</p>
						</div>
					</div>
				</div>

				<div class="pokemon-modal__block">
					<accordion v-if="Object.keys(sprites).length" :title="$t('Sprites')" group="pokemon-details">
						<div class="row total mini justify-content-center">
							<div v-for="(sprite, key, i) in sprites" :key="i" class="col-6 col-sm-3">
								<div class="text-center">
									<nuxt-img :src="sprite" :alt="`Sprite ${pokemon.name}`" />
									<p class="f--xs text-uppercase">
										{{ $t(key) }}
									</p>
								</div>
							</div>
						</div>
					</accordion>

					<accordion :title="$t('Abilities')" group="pokemon-details">
						<pokemon-abilities :abilities="pokemon.abilities" />
					</accordion>

					<accordion :title="$t('Damage relations')" group="pokemon-details">
						<pokemon-damage-relation :type="pokemon.types[0].type.name" />
					</accordion>

					<accordion v-if="evolutionChain" :title="$t('Evolution chain')" group="pokemon-details">
						<pokemon-evolution-chain :evolution-chain="evolutionChain" />
					</accordion>
				</div>
			</div>
		</div>
		<div v-else class="d-flex align-items-center justify-content-center">
			<div class="p-24">
				<loader />
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
			evolutionChain: null,
			ready: false
		};
	},
	computed: {
		sprites: function(){
			const sprites = {};

			Object.entries( this.pokemon.sprites ).forEach(([key, value]) => {
				if( typeof value === 'string' ) sprites[key] = value;
			});

			return sprites;
		},
		description: function(){
			if( !this.specie ) return false;
			const description = this.specie.flavor_text_entries.find( item => item.language.name === this.$i18n.locale );
			return description.flavor_text;
		}
	},
	created: async function(){
		this.specie = await this.getSpecie( this.pokemon.id ).then( response => response );
		if( this.specie ){
			this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url ).then( response => response );
		}
		this.ready = true;
	},
	methods: {
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON']),
		...mapActions(['getEvolutionChain', 'getSpecie', 'getEvolutionChain']),

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
	border-radius: 8px;
	overflow: hidden;

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

			&:deep(img){
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

.dark{
	.pokemon-modal{
		background: #1a202c;
	}
}
</style>
