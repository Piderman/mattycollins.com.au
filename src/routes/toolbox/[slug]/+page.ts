import { error } from '@sveltejs/kit';

import { fetchEntry, fetchEntrySummary } from '$lib/toolbox/data-access';

interface BlogLoad {
	params: {
		slug: string;
	};
}

export const load = async ({ params }: BlogLoad) => {
	const { data: entry } = await fetchEntry(params.slug);

	if (!entry) {
		throw error(404, { message: 'blog post not found' });
	}

	const relatedResponse =
		!!entry.related?.length &&
		(await Promise.all(entry.related.map((related) => fetchEntrySummary(related))));

	const relatedPosts = (relatedResponse && relatedResponse.map((response) => response.data)) || [];

	return { entry, relatedPosts };
};
