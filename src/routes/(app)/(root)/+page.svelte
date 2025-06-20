<script lang="ts">
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import Services from "./components/Services.svelte";
  import FaQs from "../../../lib/components/FAQs/FAQs.svelte";
  import { makePageTitle } from "$lib/utils";
  import SEO from "$lib/components/SEO/SEO.svelte";
</script>

<svelte:head>
  <title>{makePageTitle()}</title>
</svelte:head>

<SEO {...{ title: "", description: "" }} />

<Hero />
<About />
<Services />
<FaQs />
