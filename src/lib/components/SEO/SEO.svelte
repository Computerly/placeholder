<script lang="ts">
  import { makePageTitle } from "$lib/utils";
  import { url, defaultImages, description as _desc } from "$lib/config";

  // TODO: expand to include more og and twitter types
  type PageProps = {
    title: string;
    description: string;
    images?: string | string[];
    ogtype?: string;
  };

  let {
    title = "",
    description = _desc,
    images,
    ogtype = "website",
  }: PageProps = $props();
</script>

<svelte:head>
  <title>{makePageTitle(title)}</title>
  <meta name="description" content={description} />
  <meta name="og:title" content={title} />
  <meta name="og:type" content={ogtype} />
  {#if typeof images == "string"}
    <meta name="og:image" content={images} />
  {:else if Array.isArray(images)}
    {#each images as img}
      <meta name="og:image" content={img} />
    {/each}
  {:else}
    <meta name="og:image" content={defaultImages.og} />
    <meta name="og:image:alt" content="Rebricks Digital" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={defaultImages.twitterSummary} />
    <meta name="twitter:image:alt" content="Rebricks Digital" />
  {/if}

  <meta name="og:url" content={url} />
</svelte:head>
