<template>
	<div>
		<ul class="stadistics">
			<li v-for="(item, i) in stats" :key="i" class="stadistics__item">
				<div class="d-flex align-items-center justify-content-between mb-4">
					<p class="sub--title">
						{{ item.stat.name }}
					</p>
					<p class="f--sm">
						{{ item.base_stat }}
					</p>
				</div>
				<div class="stadistics__item__percent">
					<span :style="{}" />
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'PokemonStats',
	props: {
		stats: { type: Array, default: () => ([]) }
	}
};
</script>

<style lang="scss" scoped>
.stadistics{
	&__item{
		margin-bottom: 16px;
		&:last-of-type{margin-bottom: 0;}
		&__percent{
			width: 100%;
			height: 16px;
			display: block;
			background: rgba(#000, .1);
			border-radius: 8px;
		}
	}
}

.dark{
	.stadistics{
		&__item{
			&__percent{
				background: rgba(#fff, .1);
			}
		}
	}
}
</style>
