## About The Project

Pegipegi's web design system.

## Adding `@pegipegi/web-pegipegi-ui` to your Project

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

Make sure you have installed [Nuxt Tailwind](https://tailwindcss.nuxt.dev/). Then, you need to add this on `tailwind.config.cjs`.

```js
/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./**/@pegipegi/web-pegipegi-ui/**/*.js"]
  presets: [require('@pegipegi/pegipegi-web-ui/tailwind-config')],
};
```

You also need to update `tailwindcss` config on `nuxt.config.ts`.

```js
export default defineNuxtConfig({
  // ...
  tailwindcss: {
    cssPath: '@pegipegi/pegipegi-web-ui/style',
  },
  // ...
});
```

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

### Running Local Development Server

```bash
npm run dev
```

### VSCode Support

Refer to the [official docs](https://vuejs.org/guide/typescript/overview.html#ide-support).
