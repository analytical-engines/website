import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://analytical-engines.com',
    base: '/',
	integrations: [
		starlight({
            defaultLocale: 'ja',
			title: {
                ja: '解析機関',
                en: 'Analytical Engines',
            },
            locales: {
                ja: {
                    label: '日本語',
                    lang: 'ja',
                    //title: '解析機関',
                },
                en: {
                    label: 'English',
                    lang: 'en',
                    //title: 'Analytical Engines',
                },
            },
			social: {
				github: 'https://github.com/analytical-engines',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
