import { fetchPagedPosts } from '$lib/blog/data-access';

export const load = async () => {
	const posts = await fetchPagedPosts({ offset: 0 });
	return { posts };
};
