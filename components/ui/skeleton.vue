<template>
	<div class="skeleton">
		<div v-if="type === 'card'" class="skeleton--type__card">
			<figure class="skeleton--element skeleton--image mb-12">
				<canvas :width="120" :height="120" />
			</figure>
			<div class="skeleton--element skeleton--title w-80" />
			<div class="skeleton--element skeleton--text w-30 mt-4" />

			<div class="d-flex align-items-center mt-16">
				<div class="skeleton--element skeleton--text w-30" />
				<div class="skeleton--element skeleton--text w-30 ml-4" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UiSkeleton',
	props: {
		type: { type: String, default: 'card' }
	}
};
</script>

<style lang="scss" scoped>
$base-color: #D8D8D8;
$shine-color: #e8e8e8;
$animation-duration: 1.2s;

@keyframes load{
	from {left: -150px;}
	to{left: 100%;}
}

@mixin shineGradient( $colorA, $colorB ){
	background: $colorA !important;
	background: -moz-linear-gradient(left, $colorA 0%, $colorB 50%, $colorA 100%) !important;
	background: -webkit-linear-gradient(left, $colorA 0%,$colorB 50%,$colorA 100%) !important;
	background: linear-gradient(to right, $colorA 0%,$colorB 50%,$colorA 100%) !important;
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"' + $colorA + '"', endColorstr='"' + $colorB + '"', GradientType=1 ) !important;
}

.skeleton{
	.border-cont{
		border-radius: 4px;
		overflow: hidden;
		position: relative;
		border: 1px solid $base-color;
	}

	&--type{
		&__card{
			border: 1px solid $base-color;
			height: 100%;
			border-radius: 8px;
			padding: 16px 12px;
		}
	}

	&--element{
		position:relative;
		background: $base-color;
		overflow:hidden;

		&:not(.skeleton-image):not(.skeleton-icon):not(.skeleton-button){
			border-radius: 4px;
		}

		&:after{
			content: '';
			display: block;
			position: absolute;
			left: -10%;
			top: 0;
			height: 100%;
			width: 150px;
			@include shineGradient($base-color, $shine-color);
			animation: load 1s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
		}
	}

	&--title{height: 24px;}
	&--text{height: 14px;}
	&--image{display: inline-block}
}
</style>
