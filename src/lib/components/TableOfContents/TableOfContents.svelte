<script lang="ts">
  let { headings = [], headingDepthLimit = 2 } = $props();

  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const activeId = writable<string | null>(null);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId.set(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px", // Trigger when heading is in upper 30% of viewport
        threshold: 1,
      },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<nav class="toc">
  <div class="text-lg font-medium mb-4 text-carbon-500">On this page</div>
  <ul class="space-y-1">
    {#each headings as { id, text, depth }}
      {#if depth <= headingDepthLimit}
        <li
          class="{$activeId === id
            ? 'text-carbon-50'
            : 'text-carbon-500 hover:brightness-125 hover:underline'} "
        >
          <a href={"#" + id}>
            {text}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</nav>
