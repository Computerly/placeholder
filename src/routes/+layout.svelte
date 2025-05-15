<script lang="ts">
  import { Toaster } from "svelte-french-toast";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Rebricks Digital</title>
</svelte:head>
<Toaster />
{@render children()}
