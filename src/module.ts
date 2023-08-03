import {
  defineNuxtModule,
  createResolver,
  installModule,
  addComponentsDir,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'pegipegi-web-ui',
    configKey: 'ui',
  },
  async setup(_, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.css.push(resolver.resolve('./runtime/main.css'));
    nuxt.options.postcss = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };

    await installModule('@nuxtjs/tailwindcss', {
      configPath: resolver.resolve('./runtime/tailwind.config'),
    });

    await addComponentsDir({
      path: resolver.resolve('./runtime'),
    });
  },
});
