import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		// 新增字段適合兒童任務管理平台
		category: z.enum(['教育', '親子', '任務管理', '遊戲化', '技術分享', '產品更新']).default('教育'),
		tags: z.array(z.string()).default([]),
		author: z.string().default('TaskyVenture 團隊'),
		featured: z.boolean().default(false), // 是否為精選文章
		readingTime: z.number().optional(), // 預估閱讀時間（分鐘）
		difficulty: z.enum(['初級', '中級', '高級']).optional(), // 適合的難度級別
		ageGroup: z.string().optional(), // 適合的年齡群組，如 "6-12歲"
		draft: z.boolean().default(false), // 是否為草稿
	}),
});

// 可以添加其他內容集合，如作者信息
const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		name: z.string(),
		bio: z.string(),
		avatar: image().optional(),
		social: z.object({
			email: z.string().email().optional(),
			twitter: z.string().optional(),
			github: z.string().optional(),
		}).optional(),
	}),
});

export const collections = { blog, authors };
