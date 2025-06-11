<script lang="ts">
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import Services from "./components/Services.svelte";
  import FaQs from "./components/FAQs.svelte";
  import { makePageTitle } from "$lib/utils";
</script>

<svelte:head>
  <title>{makePageTitle()}</title>
</svelte:head>

<Hero />
<About />
<Services />
<FaQs />
