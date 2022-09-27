<template>
	<div class="dark-mode-toggle">
		<input id="switch" v-model="darkMode" type="checkbox" class="switch">
		<label for="switch" class="label">
			<font-awesome-icon icon="moon" />
			<font-awesome-icon icon="sun" />
			<div class="ball" :title="$t('Toggle dark mode')" />
		</label>
	</div>
</template>

<script>

export default {
	name: 'UiDarkMode',
	computed: {
		darkMode: {
			set: function( value ){
				this.$store.commit( 'SET_DARK', value );
			},
			get: function(){
				return this.$store.state.darkMode;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.dark-mode-toggle{
	.switch {
		opacity: 0;
		position: absolute;

		&:checked {
			+ label{
				background: $dark-mode-secondary;
			}
			+ .label .ball{
				transform: translateX(29px);
			}
		}
	}

	.label {
		background: #ddd;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 3px;
		border-radius: 50px;
		position: relative;
		width: 55px;
		height: 26px;
		transition: all .3s ease;
		border: 1px solid $color-border--light;
	}

	.label.dark {
		background: #111;
	}

	.ball {
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		top: 1px;
		left: 1px;
		width: 22px;
		height: 22px;
		transition: transform 0.3s linear;
		cursor: pointer;
	}

	.fa-moon {
		color: #fff;
	}

	.fa-sun {
		color: #555;
		margin-left: 4px;
	}
}
</style>
