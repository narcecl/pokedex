<template>
	<div class="card" :class="{'card--permalink': permalink || modal}" @click.prevent="selectPokemon">
		<div class="card__cover">
			<pokemon-actions ref="actions" view="card" :permalink="actionPermalink" :specie="{ id: details.id, name: details.specie_name }" />
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
		actionPermalink: { type: Boolean, default: true },
		modal: { type: Boolean, default: false }
	},
	methods: {
		...mapMutations(['SET_POKEMON_MODAL', 'SELECT_POKEMON']),

		selectPokemon: function( $event ){
			const actionItem = this.$methods.getParents( $event.target, this.$refs.actions.$el );
			const isAction = actionItem.includes( this.$refs.actions.$el );

			if( this.permalink && !this.modal ){
				this.$router.push({
					name: 'pokemon-id-slug',
					params: {
						id: this.details.id,
						slug: this.details.specie_name
					}
				});
			}
			else if( !isAction ){
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
				&:deep(.actions_links){opacity: 1;}
			}
		}
	}

	&__cover{
		position: relative;

		.actions_links{
			width: 100%;
			padding: 6px 12px;
			position: absolute;
			z-index: 9;
			opacity: 0;
			@include transition;
		}

		picture{
			width: 100%;
			padding: 12px;
			height: 110px;
			position: relative;

			@media screen and (min-width: $break-lg){
				height: 140px;
			}

			@media screen and (min-width: $break-xl){
				height: 110px;
			}

			&:deep(img){
				position: absolute;
				left: 12px;
				bottom: -30px;
				max-width: 70%;
				z-index: 1;

				@media screen and (min-width: $break-lg){
					max-width: 60%;
				}

				@media screen and (min-width: $break-xl){
					max-width: 70%;
				}
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
