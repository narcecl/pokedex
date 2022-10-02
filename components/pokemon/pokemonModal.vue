<template>
	<modal v-model="$store.state.pokemonModal" :size="7" :ready="ready" @close="closeModal">
		<div v-if="pokemon && ready" class="pokemon-modal">
			<div class="pokemon-modal__cover">
				<pokemon-image :name="pokemon.name" :types="pokemon.types" :src="pokemon.sprites" :plain="false" width="200" />
				<pokemon-actions view="modal" :specie="{ id: specie.id, name: specie.name }" />
			</div>
			<div class="pokemon-modal__content">
				<div class="section__block">
					<div class="d-flex align-items-center mb-12">
						<h6 class="heading--3 mr-16">
							{{ specie.name }}
						</h6>
						<pokemon-types :types="pokemon.types" size="md" />
					</div>

					<p>{{ description || $t('no_description_pokemon') }}</p>
				</div>

				<div class="section__block">
					<pokemon-info :specie="specie" :weight="pokemon.weight" :height="pokemon.height" :habitat="habitat" :compact="true" />
				</div>

				<div class="section__block">
					<accordion v-if="Object.keys(sprites).length" :title="$t('Sprites')" group="pokemon-details">
						<pokemon-sprites :sprites="sprites" :name="pokemon.name" />
					</accordion>

					<accordion :title="$t('Abilities')" group="pokemon-details">
						<pokemon-abilities :abilities="pokemon.abilities" :simple="true" />
					</accordion>

					<accordion :title="$t('Damage relations')" group="pokemon-details">
						<pokemon-damage-relation :type="pokemon.types[0].type.name" />
					</accordion>

					<accordion v-if="evolutionChain" :title="$t('Evolution chain')" group="pokemon-details">
						<pokemon-evolution-chain :evolution-chain="evolutionChain" :compact="true" />
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
			habitat: null,
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
			return description ? description.flavor_text : false;
		}
	},
	created: async function(){
		this.specie = await this.getPokemonSpecie( this.pokemon.id ).then( response => response );

		if( !this.specie.evolution_chain ){
			this.evolutionChain = [];
		}
		else{
			this.evolutionChain = await this.getEvolutionChain( this.specie.evolution_chain.url );
			if( this.specie.habitat ) this.habitat = await this.getHabitat( this.specie.habitat );
		}

		this.ready = true;
	},
	methods: {
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON']),
		...mapActions(['getEvolutionChain', 'getPokemonSpecie', 'getEvolutionChain', 'getHabitat']),

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

	&__cover{
		picture{
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
		padding: 6% 32px 32px;
	}
}

.dark{
	.pokemon-modal{
		background: #1a202c;
	}
}
</style>
