<template>
    <div class="input-cont">
        <label>{{ label }}</label>
        <input type="text" class="input" :name="inputName" :value="value" @input="input($event)">
    </div>
</template>

<script>
export default {
    name: 'customInput',
    data: function(){
        return {

        };
    },
    props: {
        type: { type: String, default: 'text' },
		name: { type: [String, Boolean], default: false },
		label: { type: String, required: true },
		value: {}
    },
    computed: {
        inputName: function(){
			return this.name || `input_${ this.$methods.numRandom(0, 99) }`;
		},
    },
    methods: {
        input: function(event){
            let value = event.target.value;
            this.$emit('input', value);
        }
    }
}
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
        padding: 10px 16px;
        border-radius: 8px;
        border: 1px solid #eee;
        font-size: 16px;
        line-height: normal;
    }
}
</style>