<template>
	<a href="#" class="pokemon__card" @click.prevent="selectPokemon">
		<pokemon-image :name="details.name" :types="details.types" :src="details.sprites" :plain="false" />

		<div class="pokemon__card__info">
			<h3 class="heading--6 fw--medium">
				{{ details.name }}
			</h3>
			<p class="f--sm">
				N.º {{ $methods.pad(details.id) }}
			</p>

			<pokemon-types :types="details.types" class="mt-16" />
		</div>
	</a>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'PokemonCard',
	props: {
		details: { type: Object, required: true }
	},
	methods: {
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON']),

		selectPokemon: function(){
			this.SET_POKEMON_MODAL( true );
			this.SELECT_POKEMON( this.details );
		}
	}
};
</script>

<style lang="scss" scoped>
.pokemon{
	&__card{
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
		text-decoration: none;
		display: block;
		background: #fff;
		border: 1px solid #eee;
		@include transition;

		&:hover{
			border-color: #ddd;

			&_info{
				border-color: #ddd;
			}
		}

		figure{
			width: 100%;
			padding: 12px;
			height: 110px;
			position: relative;

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
}

.dark{
	.pokemon__card{
		background: transparent;
		border-color: rgba(255, 255, 255, .1);

		&:hover{
			border-color: rgba(255, 255, 255, .3);
		}
	}
}
</style>
