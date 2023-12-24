import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';

import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [
    tailwind(),
    solidJs({
      include: ['**/solid/*'],
    }),
  ],
  adapter: netlify(),
});
