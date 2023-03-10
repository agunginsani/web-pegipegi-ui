import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit';

// TODO: read files using fs
// TODO: inject config file
const components = [
  'Button',
  'Input',
  'Rating',
  'Switch',
  'Checkbox',
  'Radio',
  'Textarea',
  'BottomSheet',
  'Counter',
  'Avatar',
  'Alert',
  'Banner',
];

export default defineNuxtModule({
  meta: {
    name: 'pegipegi-web-ui',
    configKey: 'ui',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_, nuxt) {
    const resolver = createResolver(import.meta.url);
    nuxt.options.modules.push('@nuxtjs/tailwindcss');
    nuxt.options.css.push(resolver.resolve('./runtime/main.css'));
    nuxt.options.postcss = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };

    components.forEach((item) =>
      addComponent({
        name: item,
        filePath: resolver.resolve(`./runtime/${item}/${item}.vue`),
      })
    );
  },
});
