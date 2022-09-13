<template>
	<button class="d-flex align-items-center" @click.prevent="click()">
		{{ name }}
		<loader v-if="loading" />
		<span v-else class="down fa-solid fa-chevron-down" aria-hidden="true" />
	</button>
</template>

<script>
export default {
	name: 'ActionButton',
	props: {
		name: { type: String, default: 'button' },
		loading: { type: Boolean, default: false }
	},
	methods: {
		click: function(){
			this.$emit( 'click' );
		}
	}
};
</script>

<style lang="scss" scoped>
button{
	display: inline-block;
	border: none;
	padding: 16px 42px 16px 20px;
	color: #fff;
	text-transform: uppercase;
	border-radius: 8px;
	font-weight: 700;
	cursor: pointer;
	background: #63b3ed;
	position: relative;
	@include transition;

	&:hover{
		background: #4696cf;
	}

	span{
		position: absolute;
		right: 16px;
	}

	:deep .loader{
		width: 16px !important;
		height: 16px !important;
		position: absolute;
		right: 16px;

		&::after{
			width: 16px !important;
			height: 16px !important;
			border-width: 2px !important;
			margin: 0 !important;
		}
	}
}

.dark{
	button{
		background: #2a4365;

		&:hover{
			background: #3a5375;
		}
	}
}
</style>
