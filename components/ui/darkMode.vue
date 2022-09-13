<template>
	<div class="dark-mode-toggle">
		<input id="switch" v-model="value" :checked="value" type="checkbox" class="switch" @change="toggleDarkMode">
		<label for="switch" class="label">
			<i class="fas fa-moon" aria-hidden="true" />
			<i class="fas fa-sun" aria-hidden="true" />
			<div class="ball" title="Alternar modo oscuro" />
		</label>
	</div>
</template>

<script>
export default {
	name: 'UiDarkMode',
	data: function(){
		return {
			value: this.$store.state.darkMode
		};
	},
	methods: {
		toggleDarkMode: function(){
			// Componente darkmode
			this.$store.commit( 'SET_DARK', this.value );
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
		border: 1px solid rgba(255, 255, 255, .1);
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
