<template>
	<div class="select-cont">
		<label>{{ label }}</label>
		<select type="text" class="input" :name="selectName" :value="value" @change="change($event)">
			<option v-for="(item, i) in options" :key="i">
				{{ item }}
			</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'UiCustomSelect',
	props: {
		options: { type: Array, default: () => ([]) },
		name: { type: [String, Boolean], default: false },
		label: { type: String, required: true },
		value: { type: [String, Boolean], default: '' }
	},
	data: function(){
		return {
		};
	},
	computed: {
		selectName: function(){
			return this.name || `select_${this.$methods.numRandom( 0, 99 )}`;
		}
	},
	methods: {
		change: function( event ){
			const value = event.target.value;
			this.$emit( 'input', value );
			this.$emit( 'selected', value );
		}
	}
};
</script>

<style lang="scss" scoped>
.select-cont{
	label{
		text-transform: uppercase;
		font-size: 12px;
		display: block;
		margin-block: 4px;
	}
	select{
		background: #fff;
		width: 100%;
		display: block;
		border: none;
		padding: 10px 16px;
		border-radius: 8px;
		border: 1px solid #eee;
		font-size: 16px;
		line-height: normal;
	}
}
</style>
