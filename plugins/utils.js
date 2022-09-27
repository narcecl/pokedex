export default {
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
	},
	parseEvolution: function( evoData ){
		if( !evoData || typeof evoData !== 'object' ) return false;
		const evoDetails = evoData.evolution_details[0] || {};
		return {
			species_name: evoData.species.name,
			min_level: evoDetails?.min_level || null,
			trigger_name: evoDetails?.trigger?.name || null,
			item: evoDetails?.item?.name || null,
			require_hapiness: evoDetails?.min_happiness > 0 || false,
			known_move: evoDetails?.known_move?.name || null,
			evolutionSplit: []
		};
	},
	parseSubEvolution: function( evoData ){
		if( !evoData || typeof evoData !== 'object' ) return false;

		const subEvoDetails = evoData.evolution_details[0] || {};
		return {
			species_name: evoData.species.name,
			min_level: !subEvoDetails ? null : subEvoDetails.min_level,
			trigger_name: !subEvoDetails ? null : subEvoDetails.trigger.name,
			item: subEvoDetails.trigger.name === 'level-up' ? null : subEvoDetails.item?.name,
			require_hapiness: subEvoDetails.min_happiness
		};
	}
};
