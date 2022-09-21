<template>
	<div v-show="isActive" :class="{ animated: isActive }" class="animate__fadeInUp">
		<div v-show="isActive" :id="tabId" role="tabpanel" class="tab-pane" :aria-labelledby="`${tabId}-control`" :class="{ active: isActive }">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppTabContent',
	props: {
		label: { type: String, default: '' },
		id: { type: String, default: '' }
	},
	data: function(){
		return {
			isActive: false
		};
	},
	computed: {
		tabId: function(){
			return ( typeof this.id === 'undefined' || this.id === null ) ? this.$methods.toSlug( this.label ) : this.id;
		}
	},
	created: function(){
		this.$parent.tabs.push( this );
	}
};
</script>
