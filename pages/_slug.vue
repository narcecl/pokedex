<template>
	<pokedex-template :slug="slug" />
</template>

<script>
export default {
	asyncData: async function({ params }){ // eslint-disable-line require-await
		const slug = params.slug;
		return { slug }; // eslint-disable-line object-shorthand
	}
};
</script>
