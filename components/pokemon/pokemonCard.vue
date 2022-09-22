<template>
	<div class="pokemon__card" @click.prevent="selectPokemon">
		<pokemon-image :name="details.specie_name" :types="details.types" :src="details.sprites" :plain="false" width="200" />

		<div class="pokemon__card__info">
			<h3 class="heading--6 fw--medium">
				{{ details.specie_name }}
			</h3>
			<p class="f--sm">
				N.º {{ $methods.pad(details.entry_number) }}
			</p>

			<pokemon-types :types="details.types" class="mt-16" />
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'PokemonCard',
	props: {
		details: { type: Object, required: true },
		permalink: { type: Boolean, default: true }
	},
	methods: {
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON']),

		selectPokemon: function(){
			if( this.permalink ){
				this.$router.push({ name: 'pokemon-slug', params: { slug: this.details.specie_name } });
			} else{
				this.SET_POKEMON_MODAL( true );
				this.SELECT_POKEMON( this.details );
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.pokemon__card{
	width: 100%;
	height: 100%;
	border-radius: 8px;
	overflow: hidden;
	text-decoration: none;
	display: block;
	background: #fff;
	border: 1px solid #eee;
	cursor: pointer;
	@include transition;

	&:hover{
		border-color: #ddd;

		&_info{
			border-color: #ddd;
		}
	}

	picture{
		width: 100%;
		padding: 12px;
		height: 190px;
		position: relative;

		@media screen and (min-width: $break-sm){
			height: 110px;
		}

		&:deep(img){
			position: absolute;
			left: 12px;
			bottom: -30px;
			max-width: 70%;
			z-index: 1;
		}
	}

	&__info{
		padding: 42px 12px 16px 12px;
		border-radius: 0 0 8px 8px;

		h3{
			text-transform: capitalize;
		}
	}
}

.dark{
	.pokemon__card{
		background: transparent;
		border-color: rgba(255, 255, 255, .1);

		&:hover{
			border-color: rgba(255, 255, 255, .3);
			background: rgba(255,255,255,.05);
		}
	}
}
</style>
