import path from 'path';

import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md'],

	vite: {
		resolve: {
			alias: {
				'@data': path.resolve('./src/data'),
				'@modules': path.resolve('./src/modules')
			}
		}
	},

	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	]
};

export default config;
