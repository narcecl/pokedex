<template>
	<div class="input-cont">
		<label v-if="label">
			{{ label }}
		</label>
		<input type="text" class="input" :name="inputName" :value="value" :placeholder="placeholder" @input="input($event)">
	</div>
</template>

<script>
export default {
	name: 'UiCustomInput',
	props: {
		type: { type: String, default: 'text' },
		placeholder: { type: String, default: '' },
		name: { type: [String, Boolean], default: false },
		label: { type: [String, Boolean], default: false },
		value: { type: [String, Number, Boolean], default: '' }
	},
	data: function(){
		return {
		};
	},
	computed: {
		inputName: function(){
			return this.name || `input_${this.$methods.numRandom( 0, 99 )}`;
		}
	},
	methods: {
		input: function( event ){
			const value = event.target.value;
			this.$emit( 'input', value );
		}
	}
};
</script>

<style lang="scss" scoped>
.input-cont{
	label{
		text-transform: uppercase;
		font-size: 12px;
		display: block;
		margin-block: 4px;
	}
	input{
		width: 100%;
		display: block;
		border: none;
		padding: 16px 20px;
		border-radius: 8px;
		border: 1px solid #eee;
		font-size: 16px;
		line-height: normal;
		background: #f7f7f7;
		@include transition;

		&:focus{
			border-color: $primary-color;
		}
	}
}

.dark{
	.input-cont{
		input{
			background: #232935;
			border-color: rgba(255,255,255, .3);
			color: #fff;

			&:focus{
				border-color: rgba(255,255,255, .6);
			}
		}
	}
}
</style>
