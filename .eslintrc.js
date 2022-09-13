module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],
	plugins: [
	],
	// add your custom rules here
	rules: {
		"indent": ["error", "tab"],
		"no-tabs": 0,
		"keyword-spacing": ["error", { "overrides": {
			"if": { "after": false },
			"else": { "after": false },
			"for": { "after": false },
			"while": { "after": false },
			"static": { "after": false },
			"as": { "after": false },
			"import": { "after": true },
			"from": { "after": true },
			"default": { "after": true }
		}}],
		"space-before-function-paren": 0,
		"space-before-blocks": 0,
		"curly": ["error", "multi-line"],
		"semi": ["error", "always"],
		"object-shorthand": ["error", "never"],
		"space-in-parens": ["error", "always", { "exceptions": ["{}", "[]", "()"] }],
		"arrow-parens": ["error", "as-needed"],
		"no-console": ["error", { "allow": ["warn", "error", "info"] }],
		"vue/html-indent": ["error", "tab", {
			"baseIndent": 1,
			"closeBracket": 0,
			"alignAttributesVertically": true,
			"ignores": []
		}],
		"vue/singleline-html-element-content-newline": ["error", {
			"ignoreWhenNoAttributes": true,
			"ignoreWhenEmpty": true,
			"ignores": ["span"]
		}],
		"vue/max-attributes-per-line": ["error", {
			"singleline": {
				"max": 6
			},
			"multiline": {
				"max": 6
			}
		}]
	}
}
