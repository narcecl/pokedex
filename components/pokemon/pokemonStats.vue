<template>
	<div>
		<ul class="stadistics">
			<li v-for="(stat, i) in fullStats" :key="i" class="stadistics__item">
				<div class="d-flex align-items-center mb-4">
					<p class="sub--title">
						{{ $t($methods.normalizeString(stat.name)) }}
					</p>
					<p class="f--xs ml-12">
						BASE {{ stat.base }}
					</p>
				</div>
				<div class="stadistics__item__percent">
					<span class="min" :style="{width: `${((stat.min / stat.max) * 100)}%` }">
						{{ stat.min }}
					</span>
					<span class="max">{{ stat.max }}</span>
				</div>
			</li>
		</ul>
		<p class="f--xs mt-24">
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
	computed: {
		fullStats: function(){
			return this.stats.map( stat => {
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

				return {
					name: stat.stat.name,
					base: base,
					min: min,
					max: max
				};
			});
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
