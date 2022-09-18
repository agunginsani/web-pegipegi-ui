module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  overrides: [
    {
      files: ['**/*.spec.{ts,tsx}'],
      rules: {
        'vue/one-component-per-file': 'off',
      },
    },
  ],
  root: true,
};
