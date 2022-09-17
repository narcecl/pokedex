<template>
	<div ref="accordion" class="accordion formatted" :class="group">
		<div ref="accordion_title" class="accordion-title">
			<a href="#" role="button" :aria-expanded="open.toString()" @click.prevent="clickAccordion($event)">
				<h3 class="sub--title">
					{{ title }}
				</h3>
				<font-awesome-icon class="down" icon="chevron-down" aria-hidden="true" />
			</a>
		</div>
		<div ref="accordion_content" class="accordion-content">
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UiAccordion',
	props: {
		title: { type: String, required: true },
		group: { type: String, default: null },
		active: { type: Boolean, default: false }
	},
	data: function(){
		return {
			open: false
		};
	},
	mounted: function(){
		if( this.active ){
			this.$refs.accordion.classList.toggle( 'active' );
			this.toggleAccordion( this.$refs.accordion_content );
		}
	},
	methods: {
		closeAccordion: function( elem ){
			this.open = false;
			elem.style.maxHeight = null;
		},
		toggleAccordion: function( elem ){
			this.open = !this.open;
			elem.style.maxHeight = elem.style.maxHeight ? null : `${elem.scrollHeight}px`;
		},
		clickAccordion: function(){
			if( this.group ){
				const elemsGroup = document.querySelectorAll( `.${this.group}` );

				if( elemsGroup.length > 1 ){
					elemsGroup.forEach( elem => {
						const content = elem.querySelector( '.accordion-content' );

						if( elem !== this.$refs.accordion ){
							elem.classList.remove( 'active' );
							this.closeAccordion( content );
						}
					});
				}
			}

			this.$refs.accordion.classList.toggle( 'active' );
			this.toggleAccordion( this.$refs.accordion_content );
		}
	}
};
</script>

<style lang="scss" scoped>
.accordion{
	margin-bottom:12px;
	@include transition();

	&:last-of-type{margin-bottom:0;}

	&.active, &:hover{
		.accordion-title{
			background: #f6f6f6;
		}
	}

	&.active{
		.accordion-title{
			border-bottom-color: #d8d8d8;
			.down{transform: rotate(180deg);}
		}
	}

	&.formatted{
		border: 1px solid #eee;
		border-radius: 8px;
		overflow: hidden;
		.accordion-title{
			a{
				@include transition;
				padding: 16px;

				.down{right:16px;}
			}
		}
		.accordion-content{
			.content{
				padding: 20px 16px;
				box-sizing: border-box;
			}
		}
	}

	.accordion-title{
		@include transition;
		overflow: hidden;
		position: relative;
		border-bottom: 1px solid transparent;

		a{
			display: block;
			z-index: 2;
			position: relative;

			> * {
				display: inline-block;
				vertical-align: middle;
				position: relative;
				pointer-events: none;
			}

			.icon{
				position: absolute !important;
				top: 0;
				bottom: 0;
				margin: auto;
				height: 34px;

				@media screen and (max-width: $break-xs){
					display: none;
				}
			}

			.down{
				@include transition;
				position: absolute;
				right: 0;
				bottom:0;
				top: 0;
				margin:auto;
				color: #444;
				height: 16px;
				font-size: 16px;
			}
		}
	}

	.accordion-content{
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.2s ease-out;
	}
}

.dark{
	.accordion{

		&.active, &:hover{
			.accordion-title{
				background: #161c28;
			}
		}

		&.active{
			.accordion-title{
				border-bottom-color: rgba(255, 255, 255, .1);
			}
		}

		&.formatted{
			border-color: rgba(255, 255, 255, .1);
		}

		.accordion-title{
			a{
				.down{
					color: #fff;
				}
			}
		}
	}
}
</style>
