<template>
	<div>
		<div v-if="type !== 'image'" :class="`skeleton--${type} skeleton--${type}--${size}`" class="skeleton__element" />
		<figure v-else class="skeleton__element skeleton--image">
			<canvas :width="imageWidth" :height="imageHeight" />
		</figure>
	</div>
</template>

<script>
export default {
	name: 'UiSkeletonItem',
	props: {
		type: { type: String, default: 'text' },
		size: { type: String, default: 'md' },
		imageHeight: { type: [String, Number], default: 0 },
		imageWidth: { type: [String, Number], default: 0 }
	}
};
</script>

<style lang="scss" scoped>
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
	&__element{
		position:relative;
		background: $skeleton-base-color;
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
			@include shineGradient($skeleton-base-color, $skeleton-shine-color);
			animation: load 1s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
		}
	}

	&--title{
		&--md{height: 24px;}
		&--lg{height: 42px;}
	}
	&--text{
		&--md{height: 14px;}
		&--lg{height: 20px;}
	}
	&--image{display: inline-block}
}

.dark{
	.skeleton{
		&__element{
			background: #313742;

			&:after{
				@include shineGradient(#313742, #2a303c);
			}
		}
	}
}
</style>
