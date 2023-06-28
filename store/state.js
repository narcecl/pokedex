export default () => ({
	allPokemons: [],
	eggGroups: [],
	favoritesPokemons: [],
	currentRegion: null,
	pokemonTypes: [],
	selectedPokemon: null,
	selectedType: null,
	pokemonModal: false,
	loading: true,
	darkMode: true,
	regions: [
		{
			name: 'Kanto',
			slug: 'kanto',
			code: 'generation-i',
			dexName: 'kanto',
			dexNumber: 2,
			starters: [1, 4, 7, 25, 133],
			legendaries: [144, 145, 146, 150],
			offset: 0,
			limit: 151,
			active: true
		},
		{
			name: 'Johto',
			slug: 'johto',
			code: 'generation-ii',
			dexName: 'original-johto',
			dexNumber: 3,
			starters: [152, 155, 158],
			legendaries: [243, 244, 245, 249, 250],
			offset: 151,
			limit: 100,
			active: true
		},
		{
			name: 'Hoenn',
			slug: 'hoenn',
			code: 'generation-iii',
			dexName: 'hoenn',
			dexNumber: 4,
			starters: [252, 255, 258],
			legendaries: [377, 378, 379, 380, 381, 382, 383, 384],
			offset: 251,
			limit: 135,
			active: true
		},
		{
			name: 'Sinnoh',
			slug: 'sinnoh',
			code: 'generation-iv',
			dexName: 'original-sinnoh',
			dexNumber: 5,
			starters: [387, 390, 393],
			legendaries: [480, 481, 482, 483, 484, 485, 486, 487, 488],
			offset: 386,
			limit: 107,
			active: true
		},
		{
			name: 'Teselia',
			slug: 'teselia',
			code: 'generation-v',
			dexName: 'original-unova',
			dexNumber: 8,
			starters: [495, 498, 501],
			legendaries: [638, 639, 640, 641, 642, 643, 644, 645, 646],
			offset: 494,
			limit: 155,
			active: true
		},
		{
			name: 'Kalos',
			slug: 'kalos',
			code: 'generation-vi',
			dexName: 'kalos-central',
			dexNumber: 12,
			starters: [650, 653, 656],
			legendaries: [716, 717, 718],
			offset: 649,
			limit: 72,
			active: true
		},
		{
			name: 'Alola',
			slug: 'alola',
			code: 'generation-vii',
			dexName: 'original-alola',
			dexNumber: 16,
			starters: [722, 725, 728],
			legendaries: [772, 773, 785, 786, 787, 788, 789, 790, 791, 792, 793, 800],
			offset: 721,
			limit: 81,
			active: true
		},
		{
			name: 'Galar',
			slug: 'galar',
			code: 'generation-viii',
			dexName: 'galar',
			dexNumber: 27,
			starters: [810, 813, 816],
			legendaries: [888, 889, 890, 891, 892, 894, 895, 896, 897, 898],
			offset: 809,
			limit: 89,
			active: true
		},
		{
			name: 'hisui',
			slug: 'hisui',
			code: '',
			dexName: 'hisui',
			dexNumber: 30,
			starters: [722, 155, 501],
			legendaries: [480, 481, 482, 485, 486, 488, 642, 641, 645, 905, 483, 484, 487, 493],
			offset: 1133,
			limit: 20,
			active: true
		},
		{
			name: 'Paldea',
			slug: 'paldea',
			code: 'generation-ii',
			dexName: 'paldea',
			dexNumber: 31,
			starters: [906, 909, 912],
			legendaries: [1007, 1008, 1003, 1004, 1002, 1001],
			offset: 1133,
			limit: 20,
			active: true
		}
	]
});
