import type { Config } from 'tailwindcss';
import libConfig from './tailwind.config.json';
import { fileURLToPath } from 'node:url';

const srcDir = fileURLToPath(new URL('./', import.meta.url));

export default <Partial<Config>>{
  ...libConfig,
  content: [srcDir + '**/*.vue'],
};
