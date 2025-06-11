<script lang="ts">
  import Pricing from "./Pricing.svelte";
  import { makePageTitle } from "$lib/utils";
</script>

<svelte:head>
  <title>{makePageTitle("Pricing")}</title>
</svelte:head>

<Pricing />
