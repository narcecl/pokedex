<template>
	<div ref="mainTab" class="tab" :class="{ mobile: isMobileViewport, scroll: scroll }">
		<div class="tab__hold">
			<div ref="nav_content" class="tab__hold__nav-content" @scroll="scrollEnd($event)">
				<ul ref="nav" class="tab__hold__nav-content__list d-flex" role="tablist">
					<li v-for="(tab, index) in tabs" :key="index" class="w-sm-100">
						<div :class="[{'active': activeTab === tab.tabId}]">
							<button
								:id="`${tab.tabId}-control`"
								:aria-label="`Ver ${tab.label}`"
								:tabindex="activeTab === tab.tabId ? false : '-1'"
								role="tab"
								:aria-selected="(activeTab === tab.tabId).toString()"
								:aria-controls="tab.tabId"
								@click.prevent="select($event, tab.tabId, true)"
							>
								<slot name="navs" :tab="tab">
									{{ tab.label }}
								</slot>
							</button>
						</div>
					</li>
				</ul>
			</div>

			<transition name="fade">
				<div v-if="checkEnd" class="arrow d-flex align-items-center justify-content-end" aria-hidden="true">
					<font-awesome-icon icon="chevron-right" aria-hidden="true" />
				</div>
			</transition>
		</div>

		<div class="tab__content">
			<div role="tabpanel" class="tab-pane" :class="{ active: activeTab === null }">
				<slot name="no-tab" />
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
import mobile from '~/mixins/mobile';
export default {
	name: 'AppTabs',
	mixins: [mobile],
	props: {
		value: { type: String, default: '' }
	},
	data: function () {
		return {
			tabs: [],
			valueLocal: null,
			mobile_breakpoint: 640,
			arrow: false,
			end: false,
			ready: false
		};
	},
	computed: {
		checkEnd: function(){
			return this.isMobileViewport && this.tabs.length > 2 && !this.end;
		},
		scroll: function(){
			return this.isMobileViewport && this.tabs.length > 2;
		},
		activeTab: {
			get: function () {
				return ( typeof this.value === 'undefined' ) ? this.valueLocal : this.value;
			},
			set: function( val ){
				if( this.value ) this.$emit( 'input', val );
				else this.valueLocal = val;
			}
		}
	},
	beforeUpdate: function() {
		if( this.value && !this.ready ){
			this.select( false, this.value, false );
			this.ready = true;
		}
	},
	methods: {
		scrollEnd: function( event ){
			const scrollLeft = event.target.scrollLeft;
			const scrollMax = event.target.scrollLeftMax;
			this.end = ( scrollLeft >= scrollMax - 30 );
		},
		select: function( event, activeTabId, scroll ){
			if( !event || activeTabId !== this.activeTab ){
				this.activeTab = activeTabId;

				this.tabs.forEach( tab => {
					tab.isActive = ( tab.tabId === activeTabId );
				});

				this.$emit( 'input', activeTabId );
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tab{
	width: 100%;

	&__hold{
		position: relative;

		&__nav-content{
			border-bottom: 1px solid $color-border--dark;
			position: relative;

			&__list{
				text-align: center;

				> li{
					> div{
						position: relative;
						overflow: hidden;
						outline: 0;
						@include transition;

						&:after{
							content: '';
							height: 4px;
							background: $primary-color;
							width: 0;
							display: block;
							margin: auto;
							position: absolute;
							bottom: 0;
							right: 0;
							left: 0;
							@include transition;
							z-index: 1;
							pointer-events: none;
						}

						&.active{
							&:after{ width: 100%; }
							button{ color: $color-text; }
						}

						> button{
							padding: 16px;
							display: block;
							position: relative;
							z-index: 2;
							outline: 0;
							height: 100%;
							border: none;
							width: 100%;
							background: transparent;
							color: rgba($color-text, .7);
							cursor: pointer;
							@include transition;
							@include subtitle;

							&:hover{
								background: rgba(#000, .025);
							}

							&:focus{
								outline-style: solid;
								outline-color: $primary-color;
							}
						}
					}
				}
			}
		}
	}

	&__content{
		padding-top: 48px;
		> .tab-pane{
			display: none;
			outline: 0;

			&.active{
				display: block;
			}
		}
	}

	&.mobile.scroll{
		.tab__hold{
			.arrow{
				position: absolute;
				right: 0;
				top: 0;
				width: 40px;
				height: 100%;
				font-size: 18px;
				color: #fff;
				background: -moz-linear-gradient(left,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%);
				background: -webkit-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 40%,rgba(255,255,255,1) 100%);
				background: linear-gradient(to right,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 40%,rgba(255,255,255,1) 100%);
				filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );
				z-index:3;
				pointer-events:none;
			}

			&__nav-content{
				overflow-x: scroll;
				scrollbar-width: none;
				-ms-overflow-style: none;
				width: 100%;
				padding-right: 30px;

				&__list{
					li {
						min-width: 200px;
					}
				}

				&::-webkit-scrollbar{
					width: 0;
					height: 0;
					display: none;
				}
			}
		}
	}
}

.dark{
	.tab{
		&__hold{
			&__nav-content{
				border-bottom: 1px solid $color-border--light;
				&__list{
					> li{
						> div{
							&.active{
								button{ color: #fff; }
							}
							button{
								color: rgba(#fff, .7);

								&:hover{
									background: rgba(#fff, .025);
								}
							}
						}
					}
				}
			}
		}
		&.mobile.scroll{
			.tab__hold{
				.arrow{
					background: -moz-linear-gradient(left,  rgba(#1a202c,0) 0%, rgba(#1a202c,1) 40%, rgba(#1a202c,1) 100%);
					background: -webkit-linear-gradient(left,  rgba(#1a202c,0) 0%,rgba(#1a202c,1) 40%,rgba(#1a202c,1) 100%);
					background: linear-gradient(to right,  rgba(#1a202c,0) 0%,rgba(#1a202c,1) 40%,rgba(#1a202c,1) 100%);
					filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );
				}
			}
		}
	}
}
</style>
