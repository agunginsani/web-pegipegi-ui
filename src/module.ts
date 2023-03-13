import {
  defineNuxtModule,
  createResolver,
  addComponent,
  installModule,
  // addComponentsDir,
} from '@nuxt/kit';

// TODO: use addComponentsDir
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

    components.forEach((item) =>
      addComponent({
        name: item,
        filePath: resolver.resolve(`./runtime/${item}/${item}.vue`),
      })
    );
  },
});
