<template>
	<button class="d-flex align-items-center" @click.prevent="click()">
		{{ name }}
		<loader v-if="loading" />
		<font-awesome-icon v-else icon="chevron-down" aria-hidden="true" />
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
	font-weight: 600;
	cursor: pointer;
	background: #63b3ed;
	position: relative;
	@include transition;

	&:hover{
		background: #4696cf;
	}

	svg{
		position: absolute;
		right: 16px;
	}

	:deep(.loader){
		transform: scale(0.25);
		position: absolute;
		right: -17px;
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
