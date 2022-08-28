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
    extend: {
			fontFamily: {
				body: FONT_FAMILY_BASE,
				mono: ['JetBrains Mono', ...MONO_FAMILY_BASE]
			}
		},
  },
  plugins: [],
};
