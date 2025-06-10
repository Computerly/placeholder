<script lang="ts">
  import Footer from "$lib/components/Footers/Main/Footer.svelte";
  import Header from "$lib/components/Headers/Main/Header.svelte";

  let { children } = $props();
</script>

<Header />
<main class="min-h-screen h-full flex flex-col">
  {@render children()}
</main>
<Footer />
