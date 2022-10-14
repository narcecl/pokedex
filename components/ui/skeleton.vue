<template>
	<div class="skeleton">
		<div v-if="type === 'card'" class="skeleton__type--card">
			<skeleton-item type="image" image-width="120" image-height="120" class="mb-12" />
			<skeleton-item type="title" class="w-80" />
			<skeleton-item type="text" class="w-30 mt-4" />

			<div class="d-flex align-items-center mt-16">
				<skeleton-item type="text" class="w-30" />
				<skeleton-item type="text" class=" w-30 ml-4" />
			</div>
		</div>
		<div v-else-if="type === 'ability'" class="skeleton__type--ability">
			<div class="w-100">
				<skeleton-item class=" w-30 mb-8" />
				<skeleton-item class=" w-80 mb-8" />
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
.skeleton{
	&__type{
		&--card{
			border: 1px solid $skeleton-base-color;
			height: 100%;
			border-radius: 8px;
			padding: 16px 12px;
		}
		&--ability{
			padding: 16px;
			border-radius: 8px;
			border: 1px solid $skeleton-base-color;
			margin-bottom: 16px;
		}
	}
}

.dark{
	.skeleton{
		&__type{
			&--card{
				border-color: $color-border--light;
			}
			&--ability{
				border-color: $color-border--light;
			}
		}
	}
}
</style>
