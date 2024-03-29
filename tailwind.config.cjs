const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: 'class',

	safelist: [
		{ pattern: /blur-(0|none|sm|md|lg|xl)/, variants: ["motion-safe", "motion-reduce"] },
		{ pattern: /-?translate-x-(0|full)/, variants: ["motion-safe", "motion-reduce"] },
		{ pattern: /transition-(opacity|all)/, variants: ["motion-safe", "motion-reduce"] },
		{ pattern: /duration-[0-9]{3,4}/, variants: ["motion-safe", "motion-reduce"] },
	],

  theme: {
		container: {
			center: true
		},
		colors: {
      transparent: 'transparent',
			black: '#090b0c',
			white: {
				DEFAULT: '#FEFEFE',
				off: '#FAF7EF'
			},
			gray: {
				darker: '#111218',
				dark: '#1d1f29',
				DEFAULT: '#2a2d3c',
				light: '#323648',
				lighter: '#3B3F54'
			},
			primary: {
				dark: '#31445E',
				DEFAULT: '#4C6A94',
				light: '#7892BA',
				lighter: "#93A8C8",
			},
			accent: {
				dark: '#4c1d95',
				DEFAULT: '#7C3AED',
				light: '#C4B5FD'
			},
			// accent2: {
			// 	DEFAULT: '#C1F7DC',
			// },
			lime: {
				dark: '#03C969',
				DEFAULT: '#04F17E',
				light: '#2AFC98',
			},
			brand: {
				react: '#61dafb',
				android: '#a4c639',
				phaser: '#99388c',
				phaserLight: '#CD79C2',
				linkedin: '#0a66c2',
				pwa: '#C4B5FD'
			},
			// primary: {
			// 	DEFAULT: '#257E76',
			// 	light: '#0FD2AB'
			// },
			// secondary: {
			// 	dark: '#31445E',
			// 	DEFAULT: '#4C6A94',
			// 	light: '#7892BA'
			// },
		},
    extend: {
			fontFamily: {
				header: ['Raleway', ...defaultTheme.fontFamily.sans],
				body: ['Raleway', ...defaultTheme.fontFamily.sans],
				mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
			},
      gridTemplateRows: {
        'header-footer': "auto 1fr auto",
      },
			keyframes: {
				'bounce-slow': {
					'0%, 100%': {
						'transform': 'translateY(-40%)',
						'animation-timing-function': 'cubic-bezier(0.8,0,1,3)',
					},
					'50%': {
						'transform': 'none',
						'animation-timing-function': 'cubic-bezier(0,0,0.2,3)',
					}
				}
			},
			animation: {
				'bounce-slow': 'bounce 3s infinite',
			},
		},
  },
  plugins: [],
};
