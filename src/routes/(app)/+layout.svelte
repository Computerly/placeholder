<script lang="ts">
  import Footer from "$lib/components/Footers/Main/Footer.svelte";
  import Contact from "$lib/components/Contact/Contact.svelte";
  import Header from "$lib/components/Headers/Main/Header.svelte";
  let { children } = $props();
</script>

<Header />
<main class="min-h-screen">
  {@render children()}
</main>
<!-- <Contact /> -->
<Footer />
