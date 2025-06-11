<script lang="ts">
  import { Toaster } from "svelte-french-toast";
  import "../app.css";
  import { makePageTitle } from "$lib/utils";
  let { children } = $props();
</script>

<svelte:head>
  <title>{makePageTitle()}</title>
</svelte:head>
<Toaster />
{@render children()}
