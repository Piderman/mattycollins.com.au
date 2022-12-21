<script lang="ts">
  import type { PageData } from './$types';
  export let data:PageData;
</script>

<article>
  <h1>{data.entry.title}</h1>
  <p>{data.entry.category}</p>
  <svelte:component this={data.entry.content} />
</article>
