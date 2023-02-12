<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<article>
	<h1>{data.entry.title}</h1>
	<div>{data.entry.category}</div>
	<svelte:component this={data.entry.content} />
</article>
