<template>
	<pokedex-template :region="foundRegion" />
</template>

<script>
export default {
	name: 'RegionPage',
	asyncData: function({ store, params, error }){
		const region = params.region;
		const foundRegion = store.state.regions.find( item => item.slug === region );

		if( !foundRegion ) return error({ statusCode: 404, message: 'Region not found' });
		return { foundRegion }; // eslint-disable-line object-shorthand
	}
};
</script>
