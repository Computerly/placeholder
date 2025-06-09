<script lang="ts">
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import Services from "./components/Services.svelte";
  import Pricing from "./components/Pricing/Pricing.svelte";
  import Process from "./components/Process/Process.svelte";
  import FaQs from "./components/FAQs.svelte";
  import Contact from "../../../lib/components/Contact/Contact.svelte";
  import SidebarHero from "./components/SidebarHero.svelte";
</script>

<Hero />
<About />
<Services />
<div class="h-[2000vh]"></div>
<!-- <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] h-full items-start">
  <div class="lg:min-h-screen lg:sticky lg:top-0">
    <SidebarHero />
  </div>
  <div class="border-x border-carbon-500">
    <Hero />
    <Services />
    <Process />
    <Pricing />
    <FaQs />
    <Contact />
  </div>
</div> -->
