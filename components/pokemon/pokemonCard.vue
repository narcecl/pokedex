<template>
	<div class="card" :class="{'card--permalink': permalink || modal}" @click.prevent="selectPokemon">
		<div class="card__cover">
			<div class="card__cover__action-links d-none d-sm-flex justify-content-end">
				<nuxt-link ref="permalink" :to="{name: 'pokemon-slug', params: { slug: details.specie_name }}" class="hover--opacity" title="Permalink">
					<font-awesome-icon icon="arrow-up-right-from-square" aria-hidden="true" />
				</nuxt-link>
			</div>
			<pokemon-image :name="details.specie_name" :types="details.types" :src="details.sprites" :plain="false" width="200" />
		</div>

		<div class="card__info">
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
import mobile from '~/mixins/mobile';

export default {
	name: 'PokemonCard',
	mixins: [mobile],
	props: {
		details: { type: Object, required: true },
		permalink: { type: Boolean, default: true },
		modal: { type: Boolean, default: false }
	},
	methods: {
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON']),

		selectPokemon: function( $event ){
			if( this.permalink ){
				this.$router.push({ name: 'pokemon-slug', params: { slug: this.details.specie_name } });
			}
			else if( $event.target !== this.$refs.permalink.$el ){
				this.SET_POKEMON_MODAL( true );
				this.SELECT_POKEMON( this.details );
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.card{
	width: 100%;
	height: 100%;
	border-radius: 8px;
	overflow: hidden;
	text-decoration: none;
	display: block;
	background: #fff;
	border: 1px solid #eee;
	@include transition;

	&--permalink{
		cursor: pointer;
	}

	&:hover{
		border-color: #ddd;
		.card{
			&__info{
				border-color: #ddd;
			}

			&__cover{
				&__action-links{opacity: 1;}
			}
		}
	}

	&__cover{
		position: relative;

		&__action-links{
			width: 100%;
			padding: 8px;
			position: absolute;
			z-index: 9;
			opacity: 0;
			color: $color-text;
			@include transition;

			&:deep(svg){
				user-select: none;
				pointer-events: none;
			}
		}

		picture{
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
	.card{
		background: transparent;
		border-color: $color-border--light;

		&:hover{
			border-color: rgba(255, 255, 255, .3);
			background: rgba(255,255,255,.05);
		}
	}
}
</style>
