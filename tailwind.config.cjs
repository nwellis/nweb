// https://github.com/withastro/astro.build/blob/main/tailwind.config.js
const FONT_FAMILY_BASE = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif',
];

const MONO_FAMILY_BASE = [
  'Menlo',
  'Monaco',
  'Lucida Console',
  'Liberation Mono',
  'DejaVu Sans Mono',
  'Bitstream Vera Sans Mono',
  'Courier New',
  'monospace',
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
		container: {
			center: true
		},
		colors: {
			black: '#090b0c',
			white: {
				DEFAULT: '',
				off: '#f5eff0'
			},
			gray: {
				dark: '#1d1f29',
				DEFAULT: '#2a2d3c',
				light: '#3B3F54'
			},
			green: {
				DEFAULT: '#257E76',
				light: '0FD2AB'
			},
			blue: {
				dark: '##31445E',
				DEFAULT: '#4C6A94',
				light: '#7892BA'
			},
		},
    extend: {
			fontFamily: {
				body: FONT_FAMILY_BASE,
				mono: ['JetBrains Mono', ...MONO_FAMILY_BASE]
			},
      gridTemplateRows: {
        'header-footer': "auto 1fr auto",
      },
		},
  },
  plugins: [],
};
