const PRODUCTION_BASE_PATH = '/pokedex';

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: true,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',

	router: {
		base: '/'
	},

	loading: {
		height: '4px'
	},

	static: {
		prefix: false
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Regional Pokédex',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no' },
			{ hid: 'description', name: 'description', content: 'Enciclopedia virtual portátil de alta tecnología que los entrenadores Pokémon llevan consigo para registrar las fichas de todas las diversas especies Pokémon con las que se encuentran durante su viaje como entrenadores.' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'shortcut icon', href: '/favicon.png' }
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
		{ src: '~/plugins/methods.js' }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: {
		dirs: [
			'~/components',
			'~/components/ui',
			'~/components/pokemon',
			'~/components/templates',
		]
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/pwa',
		'@nuxtjs/style-resources',
		'@nuxtjs/eslint-module',
		'@nuxtjs/fontawesome',
		'@nuxt/image'
	],

	fontawesome: {
		icons: {
			solid: true
		}
	},

	googleFonts: {
		display: 'swap',
		download: true,
		overwriting: false,
		preload: true,
		families: {
			'Open Sans': {
				wght: [400, 600, 700]
			},
			Raleway: {
				wght: [400, 500, 700]
			}
		}
	},

	image: {
		domains: ['raw.githubusercontent.com']
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/google-fonts',
		'@nuxtjs/i18n'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: process.env.NODE_ENV === 'development' ? '/' : PRODUCTION_BASE_PATH
	},

	i18n: {
		baseUrl: process.env.NODE_ENV === 'development' ? '/' : PRODUCTION_BASE_PATH,
		strategy: 'no_prefix',
		locales: [ 
			{ code: 'en', iso: 'en-EN', name: 'EN', file: 'en.json', },
			{ code: 'es', iso: 'en-EN', name: 'ES', file: 'es.json', },
		],
		defaultLocale: 'en',
		langDir: '~/locales/',
		vueI18n: {
			fallbackLocale: 'en',
			silentTranslationWarn: true
		}
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'es',
			name: 'Pokédex',
			theme_color: '#12181f'
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: null,
		loaders: {
			sass: {
				implementation: require('sass'),
			},
			scss: {
				implementation: require('sass'),
			},
		}
	},

	generate: {
		fallback: '404.html',
		routes: ['500.html']
	}
}
