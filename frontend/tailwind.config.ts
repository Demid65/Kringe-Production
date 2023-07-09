/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('daisyui')],
}

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class'
}