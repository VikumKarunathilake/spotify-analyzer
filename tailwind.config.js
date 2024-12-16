/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
	  extend: {
		colors: {
		  background: '#000000',
		  primary: '#C62F52',
		  'primary-hover': 'rgba(198, 47, 82, 0.1)',
		  card: 'rgba(255, 255, 255, 0.1)',
		},
		transitionProperty: {
		  'all': 'all',
		},
		transitionDuration: {
		  '300': '300ms',
		},
		transitionTimingFunction: {
		  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
		},
	  },
	},
	plugins: [],
  };