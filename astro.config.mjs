// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.taskyventure.com',
	base: '/',
	integrations: [
		mdx(), 
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		})
	],
	markdown: {
		shikiConfig: {
			theme: 'github-light',
			wrap: true
		}
	},
	compressHTML: true,
	build: {
		assets: 'assets'
	}
});
