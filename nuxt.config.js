export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Kanto Regional Pokédex - PokeAPI',
		htmlAttrs: {
			lang: 'es'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
			{
				rel: 'preload',
				href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&family=Open+Sans:wght@400;600&display=swap',
				as: 'style',
				onload: "this.rel='stylesheet'"
			},
			{
				rel: 'preload',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
				as: 'style',
				onload: "this.rel='stylesheet'"
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~assets/styles/core/_reset', '~assets/styles/main'],

	// Global SCSS utils
	styleResources: {
		scss: [
			'~assets/styles/core/_variables.scss',
			'~assets/styles/core/_mixins.scss',
		]
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~plugins/methods.js' },
		{ src: '~plugins/mixins.js', mode: 'client' },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: {
		dirs: [
			'~/components',
			'~/components/ui',
			'~/components/pokemon',
		]
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/style-resources',
		'@nuxtjs/eslint-module',
		'@nuxt/image',
	],

	image: {
		domains: ['raw.githubusercontent.com']
	},

	// Middleware to images
	serverMiddleware: [
		{ path: '/_ipx', handler: '~/server/middleware/ipx.js' }
	],

	vite: {
		/* options for vite */
		css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
						@import "@/assets/styles/core/_variables.scss";
						@import "@/assets/styles/core/_mixins.scss";
					`
                },
            },
        },
		vue: {
			/* options for vite-plugin-vue2 */
		},
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/i18n'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/'
	},

	i18n: {
		locales: [ 
			{ code: 'en', iso: 'en-EN', file: 'en.json', },
		],
		defaultLocale: 'en',
		langDir: '~/locales/',
		vueI18n: {
		  fallbackLocale: 'en',
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		loaders: {
			sass: {
				implementation: require('sass'),
			},
			scss: {
				implementation: require('sass'),
			},
		}
	}
}
