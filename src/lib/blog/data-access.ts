interface MarkdownFile {
	default: any;
}

interface BlogSource extends MarkdownFile {
	metadata: {
		category?: string;
		date: string;
		description: string;
		related?: string[];
		tags?: string[];
		title: string;
	};
}

type BlogEntry = BlogSource['metadata'] & {
	content: any;
	slug: string;
};

type BlogSummary = Pick<BlogEntry, 'description' | 'title' | 'slug'>;

/**
 * renders all posts in summary form
 *
 * @see https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#approach-2-dynamic-routes
 */
export const fetchPagedPosts = async ({ limit = 10, offset = 0 }) => {
	const allPostFiles = import.meta.glob('/src/data/blog/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	// all or allSettled? wont a failure in `all` block generation?
	const posts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// dont need the content
			const { metadata } = (await resolver()) as BlogSource;
			const postPath = path.split('/').pop()?.replace('.md', '').toLowerCase();

			// @todo refine response, this should be lean
			return {
				...metadata,
				url: `/blog/${postPath}`
			};
		})
	);

	// @todo pager

	return posts;
};

/**
 * find the post for the blog slog
 */
export const fetchEntry = async (slug: string): Promise<ApiResponse<BlogEntry>> => {
	try {
		const entry: BlogSource = await import(`../../data/blog/${slug}.md`);

		const content = entry.default;

		return {
			success: true,
			data: {
				...entry.metadata,
				content,
				slug
			}
		};
	} catch {
		return { success: false, error: 'Not found' };
	}
};

/**
 * find the summary/card info of an entry when we know its slug
 *
 * handy for related posts
 */
export const fetchEntrySummary = async (slug: string): Promise<ApiResponse<BlogSummary>> => {
	try {
		const entry: BlogSource = await import(`../../data/blog/${slug}.md`);

		return {
			success: true,
			data: {
				...entry.metadata,
				slug
			}
		};
	} catch {
		return { success: false, error: 'Related slug not found' };
	}
};

export interface SuccessResponse<T> {
	success: true;
	data: T;
	error?: undefined;
}

export interface ErrorResponse {
	success: false;
	data?: undefined;
	error: Error | string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
