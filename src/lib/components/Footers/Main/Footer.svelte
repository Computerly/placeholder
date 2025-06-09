<script lang="ts">
  import CombinationMarkNegative from "$lib/assets/logos/CombinationMarkNegative.svg";
  import { Linkedin } from "@lucide/svelte";
  import { onMount } from "svelte";
  import ConfettiOnClick from "$lib/components/Confetti/ConfettiOnClick.svelte";
  import mnflag from "$lib/assets/mnflag.svg";
  import Clock from "$lib/components/Clock.svelte";
  import { DateTime } from "luxon";

  let time = $state(DateTime.now().setZone("America/Chicago"));
  let isOpen = $derived(
    (time.hour >= 9 && time.hour < 17) ||
      (time.hour === 17 && time.minute === 0),
  );
  let digitalTime = $derived(
    time.toLocaleString(DateTime.TIME_SIMPLE, {
      locale: "en-US",
    }),
  );
  type Link = {
    title: string;
    url: string;
  };

  let links: Link[] = $state([
    {
      title: "Services",
      url: "/#services",
    },
    {
      title: "Process",
      url: "/#process",
    },
    {
      title: "About",
      url: "/#about",
    },
    {
      title: "Pricing",
      url: "/#pricing",
    },
  ]);

  const socials: (Link & { icon?: any })[] = [
    {
      title: "Linkedin",
      url: "https://www.linkedin.com/company/rebricks-digital",
      icon: Linkedin,
    },
  ];

  onMount(() => {
    // sort links alphabetically
    links.sort((a, b) => a.title.localeCompare(b.title));

    const interval = setInterval(() => {
      time = DateTime.now().setZone("America/Chicago");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<footer class="py-8 px-32 border-t border-carbon-500 overflow-hidden relative">
  <div class="grid grid-cols-[auto_1fr] items-center gap-16 py-16">
    <div class="text-carbon-200">
      <div class="flex items-center mb-4 gap-2 text-sm">
        <img
          src={mnflag}
          alt="Minnesota State Flag"
          class="inline h-4 rounded"
        />
        Based in Minnesota, USA
      </div>
      <img
        src={CombinationMarkNegative}
        alt="Rebricks Digital Logo"
        class="h-16 mb-2"
      />
      <div class="text-4xl font-medium mb-2 text-carbon-300">
        Digital Design and<br />Development
      </div>
    </div>
    <div class="grid grid-cols-2 w-fit mx-auto gap-x-16">
      {#snippet linksSnip(links: Link[])}
        <ul class="grid">
          {#each links as item}
            <li class="group">
              <a
                href={item.url}
                class="text-4xl py-2 block font-light duration-300 hover:text-carbon-100 text-carbon-300 transition-all"
                >{item.title}</a
              >

              <span
                class="block max-w-0 group-hover:max-w-full group-hover:opacity-100 opacity-0 transition-all duration-500 h-0.5 bg-carbon-100"
              ></span>
            </li>
          {/each}
        </ul>
      {/snippet}
      {@render linksSnip(links)}
      {@render linksSnip(socials)}
    </div>
  </div>

  <div class="flex justify-between items-end z-10">
    <div class="text-sm text-carbon-400">
      <!-- Legal -->
      <div class="flex flex-wrap gap-16">
        <span>Rebricks Digital™ {new Date().getFullYear()}</span>
        <ul class="flex flex-wrap gap-4">
          <li>
            <a href="/legal">Legal</a>
          </li>
          <li>
            <a href="/legal/terms">Terms</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <!-- Business Hours -->
      <div>
        <Clock {time} showDigitalClock={false} />
      </div>
      <div class="grid gap-4 text-carbon-400">
        <div class="grid gap-2">
          {#if isOpen}
            <span
              class="w-min text-xs bg-emerald-900/70 border border-emerald-950 text-emerald-100 px-2 py-1 rounded-full"
              >Open</span
            >
          {:else}
            <span
              class="w-min text-xs bg-redstone-900/70 border border-redstone-950 text-redstone-100 px-2 py-1 rounded-full"
              >Closed</span
            >
          {/if}
          <div>
            {digitalTime} CST
          </div>
        </div>
        <div>
          <p>Mon-Fri 9:00am - 5:00pm</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <ConfettiOnClick /> -->
</footer>
