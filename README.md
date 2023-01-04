## About The Project

Pegipegi's web design system.

## Adding `@pegipegi/web-pegipegi-ui` to your Project

### Exported Packages

- `@pegipegi/web-pegipegi-ui`: Vue components
- `@pegipegi/web-pegipegi-ui/style`: Base tailwind style
- `@pegipegi/web-pegipegi-ui/tailwind-config`: Tailwind config preset

### Installation

With npm

```
npm install @pegipegi/web-pegipegi-ui
```

or with yarn

```
yarn add @pegipegi/web-pegipegi-ui
```

or with pnpm

```
pnpm add @pegipegi/web-pegipegi-ui
```

### Configuration

Add this on `tailwind.config.cjs`.

```js
/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./**/@pegipegi/web-pegipegi-ui/**/*.js"]
  presets: [require('@pegipegi/pegipegi-web-ui/tailwind-config')],
};
```

If you use Nuxt.js, make sure you have installed [Nuxt Tailwind](https://tailwindcss.nuxt.dev/). Then, you need to update `tailwindcss` config on `nuxt.config.ts` to include this package style in your project.

```js
export default defineNuxtConfig({
  // ...
  tailwindcss: {
    cssPath: '@pegipegi/pegipegi-web-ui/style',
  },
  // ...
});
```

If you are not using Nuxt.js, just import `@pegipegi/pegipegi-web-ui/style` to your main entry point file.

## Contributing

### Dependencies

- [Vue](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Prerequisites

You need to install [Node.js](https://nodejs.dev/en/download/) first.

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/pegipegi/pegipegi-web-ui.git
   ```

2. Install all the dependencies

   ```sh
   npm install
   ```

### Release Management

1. Update package version using [npm-version](https://docs.npmjs.com/cli/v9/commands/npm-version)

   ```sh
   npm version <major | minor | patch>
   ```

2. Push the commit

   ```sh
   git push
   ```

3. Create [GitHub release](https://github.com/pegipegi/web-pegipegi-ui/releases/new)

### Running Local Development Server

```bash
npm run dev
```

### VSCode Support

Refer to the [official docs](https://vuejs.org/guide/typescript/overview.html#ide-support).
