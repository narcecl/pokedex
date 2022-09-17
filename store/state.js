export default () => ({
	pokemons: [],
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
			starters: [1, 4, 7, 25, 133],
			offset: 0,
			limit: 151,
			active: true
		},
		{
			name: 'Johto',
			slug: 'johto',
			starters: [152, 155, 158],
			offset: 151,
			limit: 100,
			active: true
		},
		{
			name: 'Hoenn',
			slug: 'hoenn',
			starters: [252, 255, 258],
			offset: 251,
			limit: 134,
			active: true
		},
		{
			name: 'Sinnoh',
			slug: 'sinnoh',
			starters: [387, 390, 393],
			offset: 386,
			limit: 107,
			active: true
		},
		{
			name: 'Teselia',
			slug: 'teselia',
			starters: [495, 498, 501],
			offset: 494,
			limit: 155,
			active: true
		},
		{
			name: 'Kalos',
			slug: 'kalos',
			starters: [650, 653, 656],
			offset: 649,
			limit: 72,
			active: true
		},
		{
			name: 'Alola',
			slug: 'alola',
			starters: [722, 725, 728],
			offset: 721,
			limit: 81,
			active: true
		},
		{
			name: 'Galar',
			slug: 'galar',
			starters: [810, 813, 816],
			offset: 809,
			limit: 89,
			active: true
		},
		{
			name: 'Husui',
			slug: 'husui',
			starters: [],
			offset: 1133,
			limit: 20,
			active: false
		},
		{
			name: 'Paldea',
			slug: 'paldea',
			starters: [],
			offset: 1133,
			limit: 20,
			active: false
		}
	]
});
