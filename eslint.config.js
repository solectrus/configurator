import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  ...pluginVue.configs['flat/recommended'],
  js.configs.recommended,
  ...compat.extends('plugin:vue/vue3-recommended'),
  ...compat.extends('@vue/eslint-config-typescript'),
  ...compat.extends('@vue/eslint-config-prettier/skip-formatting'),
  {
    files: [
      '**/*.vue',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '.yarn/', 'coverage/'],
  },
]
