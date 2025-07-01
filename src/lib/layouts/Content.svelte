<script lang="ts">
  import SEO from "$lib/components/SEO/SEO.svelte";
  import TableOfContents from "$lib/components/TableOfContents/TableOfContents.svelte";
  let {
    children,
    title,
    description,
    page,
    headings,
    headingDepthLimit = 2,
    ...restProps
  } = $props();
</script>

<SEO {title} {description} />

<div class="py-[calc(var(--spacing-nav)+4rem)] mx-sides">
  <div class="mb-[20vh] text-center">
    <!-- HERO -->
    <h1 class="text-6xl mb-8 font-medium">{page.title}</h1>
    <p class="text-lg mx-auto max-w-prose">{@html page.description}</p>
    <!-- <pre>
		{JSON.stringify(headings, null, 2)}
	</pre> -->
  </div>

  <div class="grid grid-cols-[1fr_auto_1fr]">
    <main class="prose mx-auto col-start-2">
      {@render children?.()}
    </main>
    {#if headings.filter((h: { depth: number }) => h.depth <= headingDepthLimit).length > 0}
      <aside
        class="hidden sticky self-start justify-self-end top-[calc(var(--spacing-nav)+4rem)] left-0 lg:flex flex-col h-[calc(100dvh-var(--nav-height))]"
      >
        <TableOfContents {headings} {headingDepthLimit} />
      </aside>
    {/if}
  </div>
</div>

<style>
  :global(h2, h3, h4, h5, h6) {
    scroll-margin-top: calc(var(--spacing-nav) + 1rem);
  }
</style>
