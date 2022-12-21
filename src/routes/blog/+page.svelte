<script lang="ts">
  import type { PageData } from './$types';
  export let data:PageData;
</script>

<article>
  <h1>Posts</h1>

<ul>
  {#each data.posts as entry}
    <li><a href={entry.url}>{entry.title}</a></li>
  {/each}
</ul>
</article>
