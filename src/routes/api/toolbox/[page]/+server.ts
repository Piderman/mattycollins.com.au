import { fetchPagedPosts } from '$lib/toolbox/data-access';
import { json } from '@sveltejs/kit';

// @todo: auto gen types
interface RouteArgs {
	params: {
		page: 0;
	};
}

export const GET = async ({ params }: RouteArgs) => {
	const posts = await fetchPagedPosts({ offset: params.page || 0 });

	return json(posts);
};
