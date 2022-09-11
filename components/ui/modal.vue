<template>
	<transition name="fade">
		<div v-if="value" class="modal h-100">
			<div class="modal-box h-100">
				<div class="container h-100">
					<div class="h-100 d-flex align-items-center">
						<div class="modal-content" :class="modalSize">
							<div class="modal-content__close d-flex justify-content-end mb-8">
								<a class="d-block" href="#" aria-label="Ocultar modal" @click.prevent="closeModal">
									<span class="fa-solid fa-xmark f-24" aria-hidden="true" />
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
		size: { type: [String, Number], default: 6 }
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
	watch: {
		value: function( newValue ){
			const body = document.querySelector( 'body' );
			if( newValue ) body.style.overflow = 'hidden';
			else body.style.overflow = 'auto';
		}
	},
	methods: {
		closeModal: function(){
			this.$emit( 'close' );
			this.$emit( 'input', false );
		}
	}
};
</script>

<style lang="scss" scoped>
.modal{
	width: 100%;
	position: fixed;
	top: 0;
	left:0;
	right:0;
	bottom:0;
	background: rgba($primary-black, .7);
	z-index: 100;

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
