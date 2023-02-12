---
date: 2022-12-21
title: Hullo Test Post
category: mock
---

what happens here

- test
- list
- ok

Are footnotes[^1] supported out of the box?

## the end

> ty ty

```ts
type Response<Data> = { data: Data } | null;
```

```html
<a href="/about">
	read more
	<span class="sr-only"> about [article headline]</span>
</a>
```

```css
* + * {
	margin-top: 1em;
}

a[href] {
	border-bottom: 1px dashed #b3b3b5;
}

@media (min-width: 768px) {
	--spacer: 2em;
}
```

```ts
export const GET = async ({ params }: RouteArgs) => {
	const posts = await fetchPagedPosts({ offset: params.page || 0 });

	let message = 'post not found';

	return json(posts);
};
```

```js
export const GET = async ({ params }: RouteArgs) => {
	const posts = await fetchPagedPosts({ offset: params.page || 0 });

	let message = 'post not found';

	return json(posts);
};
```

[^1]: perhaps not
