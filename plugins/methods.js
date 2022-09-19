import Vue from 'vue';

Vue.prototype.$methods = {
	pad: function( number ){
		return String( number ).padStart( 3, '0' );
	},
	numRandom: function( min, max ){
		return Math.floor( Math.random() * ( max - min )) + min;
	},
	getCookie: function( name ){
		const value = `; ${document.cookie}`;
		const parts = value.split( `; ${name}=` );
		if( parts.length === 2 ) return parts.pop().split( ';' ).shift();
	},
	capitalize: function( string ){
		return string[0].toUpperCase() + string.substring( 1 );
	},
	getParents: function( node, limit = null ){
		let current = node;
		const list = [];

		while( current.parentNode !== null && current !== document.documentElement ){
			list.push( current.parentNode );
			current = current.parentNode;

			if( limit ){
				const currentElement = typeof limit === 'object' ? limit : document.querySelector( limit );
				if( current === currentElement ) break;
			}
		}

		return list;
	}
};
