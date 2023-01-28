const defaultTheme = require("tailwindcss/defaultTheme");

// https://github.com/withastro/astro.build/blob/main/tailwind.config.js
// const FONT_FAMILY_BASE = [
//   'system-ui',
//   '-apple-system',
//   'BlinkMacSystemFont',
//   'Segoe UI',
//   'Roboto',
//   'Oxygen',
//   'Ubuntu',
//   'Cantarell',
//   'Open Sans',
//   'Helvetica Neue',
//   'sans-serif',
// ];

// const MONO_FAMILY_BASE = [
//   'Menlo',
//   'Monaco',
//   'Lucida Console',
//   'Liberation Mono',
//   'DejaVu Sans Mono',
//   'Bitstream Vera Sans Mono',
//   'Courier New',
//   'monospace',
// ];

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
				light: '#7892BA'
			},
			accent: {
				dark: '#4c1d95',
				DEFAULT: '#7C3AED',
				light: '#C4B5FD'
			},
			brand: {
				react: '#61dafb',
				android: '#a4c639',
				phaser: '#99388c',
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
		},
  },
  plugins: [],
};
