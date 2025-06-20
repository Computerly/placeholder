<script lang="ts">
  import SEO from "$lib/components/SEO/SEO.svelte";
  let { children, title, description, ...restProps } = $props();
</script>

<SEO {title} {description} />

<div class="py-[calc(var(--spacing-nav)+4rem)] prose mx-auto">
  {@render children?.()}
</div>
