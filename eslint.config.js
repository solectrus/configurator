import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'
import pluginVue from 'eslint-plugin-vue'

import vueTsEslintConfig from '@vue/eslint-config-typescript'
import prettierConfig from '@vue/eslint-config-prettier'

export default [
  ...pluginTailwindcss.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        whitelist: ['background-image'],
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginPrettierRecommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
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
  prettierConfig,
]
