<script lang="ts">
  import Footer from "$lib/components/Footers/Main/Footer.svelte";
  let { children } = $props();
</script>

<main class="mx-32 px-4 sm:px-6 lg:px-8">
  {@render children()}
</main>

<Footer />
