import Vue from 'vue';

Vue.prototype.$methods = {
    pad: function(number){
        return String(number).padStart(3, "0")
    },
    numRandom: function( min, max ){
		return Math.floor(Math.random() * (max - min)) + min;
	},
};