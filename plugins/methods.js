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
		// return string[0].toUpperCase() + string.substring( 1 );
		if( !string || !string.length ) return string;

		const arr = string.split( ' ' );
		return arr.map( word => {
			return word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase();
		}).join( ' ' );
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
	},
	normalizeString: function( str ){
		if( !str ) return '';
		return this.capitalize( str.split( '-' ).join( ' ' ));
	},
	toSlug: function( str ){
		if( !str ) return '';

		let text = str.replace( /^\s+|\s+$/g, '' ).toLowerCase().trim();
		const from = 'ÀÁÄÂÀÃÅČÇĆĎÈÉĚËÈÊẼĔȆÌÍÌÎÏŇÑÒÓÖÒÔÕØŘŔŠŤÙÚŮÜÙÛÝŸŽàáäâàãåčçćďèéěëèéêẽĕȇìíìîïňñòóöòôõøðřŕšťùúůüùûýÿžþÞĐđßÆ/·_,:;';
		const to = 'AAAAAAACCCDEEEEEEEEEIIIIINNOOOOOOORRSTUUUUUUYYZaaaaaaacccdeeeeeeeeeeiiiiinnoooooooorrstuuuuuuyyzbBDdBA-';

		for( let i = 0, l = from.length; i < l; i++ ){
			const word = from.charAt( i );
			const replace = to.charAt( i );
			text = text.split( word ).join( replace );
		}

		text = text.split(' ').join('-').split('--').join('-').split('/').join('-').split('?').join('').split('¿').join('').split('!').join('').split('¡').join('').split('(').join('').split(')').join(''); // eslint-disable-line space-in-parens
		return text;
	}
};
