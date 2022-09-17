<template>
	<transition name="fade">
		<div v-if="value" class="modal h-100" @click.prevent="closeOutside">
			<div class="modal-box h-100">
				<div class="container h-100">
					<div class="h-100 d-flex align-items-center">
						<div class="modal-content" :class="modalSize">
							<div v-if="ready" class="modal-content__close d-flex justify-content-end mb-8">
								<a class="d-block" href="#" aria-label="Ocultar modal" @click.prevent="closeModal">
									<font-awesome-icon class="f-24" icon="xmark" aria-hidden="true" />
								</a>
							</div>
							<div ref="modal_box">
								<div class="modal-content">
									<main :style="[limitHeight]">
										<slot />
									</main>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'UiModal',
	props: {
		value: { type: Boolean, default: false },
		ready: { type: Boolean, default: false },
		size: { type: [String, Number], default: 6 }
	},
	head: function(){
		return {
			bodyAttrs: {
				class: this.value && 'modal--open'
			}
		};
	},
	computed: {
		modalSize: function(){
			return `col-sm-9 col-lg-${this.size}`;
		},
		limitHeight: function(){
			const max = this.window_height * 70 / 100;

			return {
				maxHeight: `${max}px`,
				overflow: 'auto'
			};
		}
	},
	mounted: function(){
		this.addEscEvent();
	},
	methods: {
		closeModal: function(){
			this.$emit( 'close' );
			this.$emit( 'input', false );
			this.rmEscEvent();
		},
		closeOutside: function( event ){
			let parentModal = null;
			const parents = this.$methods.getParents( event.target, '.modal' );

			parents.forEach( item => {
				if( item === this.$refs.modal_box ) parentModal = true;
			});

			if( !event.target.classList.contains( 'modal-box' ) && parentModal === null ){
				this.closeModal();
			}
		},
		closeModalByEsc: function( e ){
			if( e.keyCode === 27 ) this.closeModal();
		},
		addEscEvent: function(){
			// Agregamos el evento keyup para cerrar la modal
			window.addEventListener( 'keyup', this.closeModalByEsc );
		},
		rmEscEvent: function(){
			// Eliminamos el evento keyup para cerrar la modal
			window.removeEventListener( 'keyup', this.closeModalByEsc );
		}
	}
};
</script>

<style lang="scss" scoped>
.modal{
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba($primary-black, .9);
	z-index: 100;
	backdrop-filter: blur(10px);

	.modal-box{
		.modal-content{
			width: 100%;
			margin: 0 auto;
			position: relative;
			padding: 0;

			&__close{
				a{
					color: #fff;
					@include transition;

					&:hover{
						opacity: .7;
					}
				}
			}

			.modal-content {
				main{
					border-radius: 8px;
					overflow: hidden;
				}
			}
		}
	}
}
</style>
