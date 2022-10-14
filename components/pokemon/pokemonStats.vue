<template>
	<div v-viewport="setReady">
		<ul v-if="ready" class="stadistics">
			<li v-for="(stat, i) in fullStats" :key="i" class="stadistics__item">
				<div class="d-flex align-items-center mb-4">
					<p class="sub--title">
						{{ $t($methods.normalizeString(stat.name)) }}
					</p>
					<p class="f--xs ml-12">
						BASE {{ stat.base }}
					</p>
				</div>
				<div :class="{ ready: stadistics[`stadistics_${i}`] }" class="stadistics__item__percent">
					<span class="min" :style="{width: (stadistics[`stadistics_${i}`] ? `${((stat.min / stat.max) * 100)}%`: 0) }">
						{{ stat.min }}
					</span>
					<span class="max">{{ stat.max }}</span>
				</div>
			</li>
		</ul>
		<ul v-else>
			<li v-for="n in 6" :key="n" :class="n < 6 ? 'mb-20' : ''">
				<div class="mb-4">
					<skeleton-item type="text" class="w-30 mb-4" />
					<skeleton-item type="title" class="w-100" />
				</div>
			</li>
		</ul>
		<p v-if="ready" class="f--xs mt-24">
			{{ $t('min_stat_desc', {level: 100, nature: 'neutral', ev: 0, iv: 0}) }}<br>
			{{ $t('max_stat_desc', {level: 100, nature: 'neutral', ev: 255, iv: 31}) }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'PokemonStats',
	props: {
		stats: { type: Array, default: () => ([]) }
	},
	data: function(){
		return {
			ready: false,
			stadistics: {}
		};
	},
	computed: {
		fullStats: function(){
			return this.stats.map(( stat, index ) => {
				const base = stat.base_stat;
				const level = 100;
				let min, max;

				if( stat.stat.name === 'hp' ){
					min = Math.floor( 0.01 * ( 2 * base + 0 + Math.floor( 0.25 * 0 )) * level ) + level + 10;
					max = Math.floor( 0.01 * ( 2 * base + 31 + Math.floor( 0.25 * 255 )) * level ) + level + 10;
				}
				else{
					min = ( Math.floor( 0.01 * ( 2 * base + 0 + Math.floor( 0.25 * 0 )) * level ) + 5 );
					max = ( Math.floor( 0.01 * ( 2 * base + 31 + Math.floor( 0.25 * 255 )) * level ) + 5 );
				}

				this.$set( this.stadistics, `stadistics_${index}`, false );

				return {
					name: stat.stat.name,
					base: base,
					min: min,
					max: max
				};
			});
		}
	},
	created: function(){
		if( this.stats ) this.ready = true;
	},
	methods: {
		setReady: function(){
			if( this.ready ){
				const time = 200;
				this.fullStats.forEach(( item, index ) => {
					setTimeout(() => {
						this.stadistics[`stadistics_${index}`] = true;
					}, time * index );
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.stadistics{
	&__item{
		margin-bottom: 20px;
		&:last-of-type{margin-bottom: 0;}
		&__percent{
			width: 100%;
			display: block;
			background: rgba(#000, .1);
			border-radius: 8px;
			position: relative;

			&.ready{
				.min{
					@include transition(width);
					opacity: 1;
				}
			}

			.min{
				display: block;
				border-radius: 8px;
				background: $primary-color;
				height: 100%;
				text-align: right;
				box-sizing: border-box;
				padding-right: 8px;
				font-size: 12px;
				color: #fff;
				opacity: 0;
			}

			.max{
				position: absolute;
				right: 8px;
				top: 0;
				font-size: 12px;
			}
		}
	}
}

.dark{
	.stadistics{
		&__item{
			&__percent{
				background: rgba(255, 255, 255, .03)
			}
		}
	}
}
</style>
