/** @type import('prettier').Config */
export default {
  bracketSpacing: false,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  printWidth: 80,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        semi: false,
        trailingComma: 'all',
        parser: 'typescript',
      },
    },
  ],
  plugins: [import('prettier-plugin-tailwindcss')],
};
