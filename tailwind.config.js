/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');
const { de } = require('date-fns/locale');

/** @type {import('tailwindcss/types').Config} */
const config = {
	darkMode: 'selector',
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				primary: {
					default: '#0497ff',
					50: '#e6f5ff',
					100: '#cdeaff',
					200: '#9bd5ff',
					300: '#68c1ff',
					400: '#36acff',
					500: '#0497ff',
					600: '#0379cc',
					700: '#025b99',
					800: '#023c66',
					900: '#011e33',
				},
				secondary: {
					default: '#0419ff',
					50: '#e6e8ff',
					100: '#cdd1ff',
					200: '#9ba3ff',
					300: '#6875ff',
					400: '#3647ff',
					500: '#0419ff',
					600: '#0314cc',
					700: '#020f99',
					800: '#020a66',
					900: '#010533',
				},
				tertiary: {
					default: '#04ffea',
					50: '#e6fffd',
					100: '#cdfffb',
					200: '#9bfff7',
					300: '#68fff2',
					400: '#36ffee',
					500: '#04ffea',
					600: '#03ccbb',
					700: '#02998c',
					800: '#02665e',
					900: '#01332f',
				},
				success: {
					default: '#2e7d32',
					50: '#eaf2eb',
					100: '#d5e5d6',
					200: '#abcbad',
					300: '#82b184',
					400: '#58975b',
					500: '#2e7d32',
					600: '#256428',
					700: '#1c4b1e',
					800: '#123214',
					900: '#09190a',
				},
				warning: {
					default: '#ed6c02',
					50: '#fdf0e6',
					100: '#fbe2cc',
					200: '#f8c49a',
					300: '#f4a767',
					400: '#f18935',
					500: '#ed6c02',
					600: '#be5602',
					700: '#8e4101',
					800: '#5f2b01',
					900: '#2f1600',
				},
				danger: {
					default: '#d32f2f',
					50: '#fbeaea',
					100: '#f6d5d5',
					200: '#edacac',
					300: '#e58282',
					400: '#dc5959',
					500: '#d32f2f',
					600: '#a92626',
					700: '#7f1c1c',
					800: '#541313',
					900: '#2a0909',
				},
			},
		},
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
		},
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [formsPlugin],
};
module.exports = config;
